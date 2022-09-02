const ParticipantDto = require('../model/dto/participant.dto');
const Query = require('../utils/query.utils');

const ParticipantRepository = (db) => {
    const create = async (payload) => {
        try {
            const sg = await db.query(Query().FIND_SG_BY_PK, [payload.socialGatheringId]);
            const participants = await db.query(Query().FIND_PARTICIPANT, [sg.rows[0]['id']]);

            // Melakukan check terlebih dahulu apakah arisan sudah memenuhi jumlah maksimal peserta
            if (participants.rowCount === sg.rows[0]['max_participants']) return `${sg.rows[0]['name']} has reached the maximum limit of participants`;

            // Melakukan check terlebih dahulu apakah inputan balance memenuhi jumlah tagihan arisan atau tidak
            if (payload.balance < sg.rows[0].amount) return `Your balance must be greater than or equal to ${sg.rows[0].amount}, to join ${sg.rows[0].name}.`;
            const result = await db.query(Query().CREATE_PARTICIPANT, [
                payload.socialGatheringId,
                payload.name,
                payload.address,
                payload.contactPerson,
                payload.balance,
                new Date()
            ]);
            return ParticipantDto(result, sg);
        } catch (err) {
            throw new Error(err);
        }
    };

    const list = async () => {
        try {
            const result = await db.query(Query().FIND_ALL_PARTICIPANT);
            const participants = [];
            for (let i = 0; i < result.rows.length; i++) {
                const sg = await db.query(Query().FIND_SG_BY_PK, [result.rows[i]['social_gathering_id']]);
                participants.push(ParticipantDto(result, sg, i));
            }
            return participants;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getById = async (id) => {
        try {
            const result = await db.query(Query().FIND_PARTICIPANT_BY_PK, [id]);
            if (result.rowCount === 0) return `Participant with value ID ${id} not found`;
            const sg = await db.query(Query().FIND_SG_BY_PK, [result.rows[0]['social_gathering_id']]);
            return ParticipantDto(result, sg);
        } catch (err) {
            throw new Error(err);
        }
    };

    const update = async (id, payload) => {
        try {
            const idx = await getById(id);
            if(typeof idx === 'string') return `Participant with value ID ${id} not found`;
            const sg = await db.query(Query().FIND_SG_BY_PK, [idx.socialGathering['id']]);
            const result = await db.query(Query().UPDATE_PARTICIPANT, [
                payload.name,
                payload.address,
                payload.contactPerson,
                new Date(),
                id
            ]);
            return ParticipantDto(result, sg);
        } catch (err) {
            throw new Error(err);
        }
    };

    const updateBalance = async (id, payload) => {
        try {
            const idx = await getById(id);
            if(typeof idx === 'string') return `Participant with value ID ${id} not found`;
            if (payload.balance < 10000) return `Minimum top up balance must be greater than 10.000`;
            const sg = await db.query(Query().FIND_SG_BY_PK, [idx.socialGathering['id']]);
            const result = await db.query(Query().UPDATE_BALANCE, [
                idx.balance = idx.balance + payload.balance,
                new Date(),
                id
            ]);
            return ParticipantDto(result, sg);
        } catch (err) {
            throw new Error(err);
        }
    };

    const remove = async (id) => {
        try {
            const idx = await getById(id);
            if (typeof idx === 'string') return `Participant with value ID ${id} not found`;
            const sg = await db.query(Query().FIND_SG_BY_PK, [idx.socialGathering['id']]);
            if (sg.rowCount !== 0) return `This participant can't be deleted because it has been already joined to ${sg.rows[0].name}`;
            await db.query(Query().DELETE_PARTICIPANT, [id]);
            return `Participant with value ID ${id} successfully deleted`;
        } catch (err) {
            throw new Error(err);
        }
    };

    return { create, list, getById, update, updateBalance, remove };
}

module.exports = ParticipantRepository;