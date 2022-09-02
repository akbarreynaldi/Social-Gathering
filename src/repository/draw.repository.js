const DrawDto = require('../model/dto/draw.dto');
const Query = require('../utils/query.utils');

const DrawRepository = (db) => {
    const create = async (payload) => {
        try {
            const participantArr = []; // Untuk menampung id participants yang akan diundi

            const sg = await db.query(Query().FIND_SG_BY_PK, [payload.socialGatheringId]);
            const isNotPay = await db.query(Query().FIND_PARTICIPANT_NOT_PAY, [payload.socialGatheringId]);
            const participants = await db.query(Query().FIND_PARTICIPANT, [payload.socialGatheringId]);

            // Melakukan check terlebih dahulu apakah terdapat arisan dengan id tersebut
            if (sg.rowCount === 0) return `Social gathering with value ID ${payload.socialGatheringId} not found`;

            // Melakukan check terlebih apakah ada peserta yang belum membayar tagihan
            if (isNotPay.rowCount !== 0 && participants.rowCount !== 0) return {
                message: 'There are still participants who have not paid the social gathering bill',
                unpaid: isNotPay.rows
            };

            // Melakukan pengecekan apakah terdapat peserta pada arisan tersebut yang belum pernah menang arisan
            if (participants.rowCount === 0) return `All ${sg.rows[0]['name']} participants have been draw`;

            // Memulai postgres transaction
            await db.query('BEGIN');

            // Pengulangan untuk memasukan id peserta ke variabel participantArr
            for (let i = 0; i < participants.rows.length; i++) {
                participantArr.push(participants.rows[i]['id'])
            }

            // Melakukan pengundian arisan berdasarkan id yang ditampung di variabel participantArr menggunakan fungsi math random
            let draw = Math.ceil(Math.random() * participantArr[participantArr.length-1]);

            // Jika hasil yang diberikan dari pengundian diatas angkanya tidak ada pada participantArr, maka akan dilakukan random angka lagi untuk memastikan angka yang keluar ada pada participantArr
            if (!participantArr.includes(draw)) {
                while (!participantArr.includes(draw)) {
                    draw = Math.ceil(Math.random() * participantArr[participantArr.length - 1]);
                }
            }

            const winner = await db.query(Query().FIND_PARTICIPANT_BY_PK, [draw]);

            // Reset total amount menjadi 0
            await db.query(Query().UPDATE_TOTAL_AMOUNT_SG, [
                new Date(),
                payload.socialGatheringId
            ])

            // Menambahkan balance peserta yang menang undian arisan dan mengubah isStatus menjadi true
            await db.query(Query().UPDATE_WINNER, [
                winner.rows[0]['balance'] = winner.rows[0]['balance'] + sg.rows[0]['total_amount'],
                new Date(),
                winner.rows[0]['id']
            ])

            // Reset isPayment seluruh peserta yang mengikuti arisan id yang sama menjadi false
            await db.query(Query().RESET_PAYMENT_STATUS, [
                new Date(),
                payload.socialGatheringId
            ])

            // Memasukan data ke table draw
            const result = await db.query(Query().CREATE_DRAW, [
                payload.socialGatheringId,
                winner.rows[0]['id'],
                sg.rows[0]['total_amount'],
                new Date(),
                new Date()
            ]);

            // Jika seluruh transaction berhasil maka akan dijalankan commit
            await db.query('COMMIT');
            return DrawDto(result, winner, sg);
        } catch (err) {
            // Jika ada satu transaction yang gagal maka akan dijalankan rollback
            await db.query('ROLLBACK');
            throw new Error(err);
        }
    };

    const list = async () => {
        try {
            const result = await db.query(Query().FIND_ALL_DRAW);
            const draws = [];
            for (let i = 0; i < result.rows.length; i++) {
                const sg = await db.query(Query().FIND_SG_BY_PK, [result.rows[i]['social_gathering_id']]);
                const participant = await db.query(Query().FIND_PARTICIPANT_BY_PK, [result.rows[i]['participant_id']]);
                draws.push(DrawDto(result, participant, sg, i));
            }
            return draws;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getById = async (id) => {
        try {
            const result = await db.query(Query().FIND_DRAW_BY_PK, [id]);
            const sg = await db.query(Query().FIND_SG_BY_PK, [result.rows[0]['social_gathering_id']]);
            const participant = await db.query(Query().FIND_PARTICIPANT_BY_PK, [result.rows[0]['participant_id']]);
            if (result.rowCount === 0) return `Draw with value ID ${id} not found`;
            return DrawDto(result, participant, sg);
        } catch (err) {
            throw new Error(err);
        }
    };

    return { create, list, getById };
}

module.exports = DrawRepository;