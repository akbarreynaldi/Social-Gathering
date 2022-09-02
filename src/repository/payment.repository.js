const PaymentDto = require('../model/dto/payment.dto');
const Query = require('../utils/query.utils');

const PaymentRepository = (db) => {
    const create = async (payload) => {
        try {
            const sg = await db.query(Query().FIND_SG_BY_PK, [payload.socialGatheringId]);
            const participant = await db.query(Query().FIND_PARTICIPANT_BY_PK, [payload.participantId]);

            // Melakukan check terlebih dahulu apakah terdapat peserta dengan id tersebut
            if (participant.rowCount === 0) return `Participant with value ID ${payload.participantId} not found`;

            // Melakukan check terlebih dahulu apakah terdapat arisan dengan id tersebut
            if (sg.rowCount === 0) return `Social Gathering with value ID ${payload.socialGatheringId} not found`;

            // Melakukan check terlebih dahulu apakah peserta dengan id tersebut mengikuti arisan dengan id yang sama dengan inputan
            if (participant.rows[0]['social_gathering_id'] !== payload.socialGatheringId) return `Participant with value ID ${participant.rows[0]['id']} not joined to social gathering with value ID ${payload.socialGatheringId}`;

            // Melakukan check terlebih dahulu apakah balance peserta memenuhi jumlah tagihan
            if (participant.rows[0].balance < sg.rows[0].amount) return `Insufficient funds for pay ${sg.rows[0].name} bills`;

            // Memulai postgres transaction
            await db.query('BEGIN');

            // Menambahkan total amount arisan sesuai tagihan pembayaran
            await db.query(Query().UPDATE_TOTAL_AMOUNT_SG, [
                sg.rows[0]['total_amount'] = sg.rows[0]['total_amount'] + sg.rows[0]['amount'],
                new Date(),
                payload.socialGatheringId
            ])

            // Mengurangi balance peserta sesuai tagihan pembayaran
            await db.query(Query().UPDATE_BALANCE, [
                participant.rows[0]['balance'] = participant.rows[0]['balance'] - sg.rows[0]['amount'],
                new Date(),
                payload.participantId
            ])

            // Mengubah status pembayaran menjadi true
            await db.query(Query().UPDATE_PAYMENT_STATUS, [
                new Date(),
                payload.participantId
            ])

            // Memasukan pembayaran ke table payment
            const result = await db.query(Query().CREATE_PAYMENT, [
                payload.socialGatheringId,
                payload.participantId,
                sg.rows[0].amount,
                new Date(),
                new Date()
            ]);

            // Jika seluruh transaction berhasil maka akan dijalankan commit
            await db.query('COMMIT');
            return PaymentDto(result, participant, sg);
        } catch (err) {
            // Jika ada satu transaction yang gagal maka akan dijalankan rollback
            await db.query('ROLLBACK');
            throw new Error(err);
        }
    };

    const list = async () => {
        try {
            const result = await db.query(Query().FIND_ALL_PAYMENT);
            const payments = [];
            for (let i = 0; i < result.rows.length; i++) {
                const sg = await db.query(Query().FIND_SG_BY_PK, [result.rows[i]['social_gathering_id']]);
                const participant = await db.query(Query().FIND_PARTICIPANT_BY_PK, [result.rows[i]['participant_id']]);
                payments.push(PaymentDto(result, participant, sg, i));
            }
            return payments;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getById = async (id) => {
        try {
            const result = await db.query(Query().FIND_PAYMENT_BY_PK, [id]);
            if (result.rowCount === 0) return `Payment with value ID ${id} not found`;
            const sg = await db.query(Query().FIND_SG_BY_PK, [result.rows[0]['social_gathering_id']]);
            const participant = await db.query(Query().FIND_PARTICIPANT_BY_PK, [result.rows[0]['participant_id']]);
            return PaymentDto(result, participant, sg);
        } catch (err) {
            throw new Error(err);
        }
    };

    return { create, list, getById };
}

module.exports = PaymentRepository;