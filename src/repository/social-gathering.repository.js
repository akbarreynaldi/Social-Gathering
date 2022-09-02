const SocialGatheringDto = require('../model/dto/social-gathering.dto');
const Query = require('../utils/query.utils');
const GeneratorDate = require('../utils/generate-end-date.utils')

const SocialGatheringRepository = (db) => {
    const create = async (payload) => {
        try {
            // Melakukan check terlebih dahulu apakah inputan periode adalah weeks atau months
            if (payload.periodic.toLowerCase() !== 'weeks' && payload.periodic.toLowerCase() !== 'months') return `Input period value must be weeks or months`;

            // Melakukan check terlebih dahulu apakah input amount arisan lebih dari 10.000
            if (payload.amount < 10000 ) return `Input amount must be at least 10.000`;
            const startDate = new Date();
            const endDate = GeneratorDate(new Date(), payload.periodic, payload.maxParticipants)
            const result = await db.query(Query().CREATE_SG, [
                payload.name,
                payload.amount,
                0,
                payload.maxParticipants,
                payload.periodic,
                startDate,
                endDate,
                new Date()
            ]);
            return SocialGatheringDto().createAndUpdate(result);
        } catch (err) {
            throw new Error(err);
        }
    };

    const list = async () => {
        try {
            const result = await db.query(Query().FIND_ALL_SG);
            const socialGatherings = [];
            for (let i = 0; i < result.rows.length; i++) {
                const participant = await db.query(Query().FIND_PARTICIPANT, [result.rows[i]['id']]);
                const participantArr = participant.rows
                socialGatherings.push(SocialGatheringDto().list(result, participantArr, i));
            }
            return socialGatherings;
        } catch (err) {
            throw new Error(err);
        }
    };

    const getById = async (id) => {
        try {
            const result = await db.query(Query().FIND_SG_BY_PK, [id]);
            const participant = await db.query(Query().FIND_PARTICIPANT, [result.rows[0]['id']]);
            const participantArr = participant.rows
            if (result.rowCount === 0) return `Social gathering with value ID ${id} not found`;
            return SocialGatheringDto().list(result, participantArr);
        } catch (err) {
            throw new Error(err);
        }
    };

    const update = async (id, payload) => {
        try {
            const idx = await getById(id);
            if(typeof idx === 'string') return `Social gathering with value ID ${id} not found`;
            const participant = await db.query(Query().FIND_PARTICIPANT, [id]);
            if(participant.rowCount !== 0) return `Social gathering with value ID ${id} can't be updated, because it already has participant`;
            if (payload.periodic.toLowerCase() !== 'weeks' && payload.periodic.toLowerCase() !== 'months') return `Input period value must be weeks or months`;
            if (payload.amount <= 10000 ) return `Input amount must be at least 10000`;
            const startDate = new Date(payload.startDate);
            const endDate = GeneratorDate(new Date(payload.startDate), payload.periodic, payload.maxParticipants);
            const result = await db.query(Query().UPDATE_SG, [
                payload.name,
                payload.amount,
                payload.maxParticipants,
                payload.periodic,
                new Date(startDate),
                new Date(endDate),
                new Date(),
                id
            ]);
            return SocialGatheringDto().createAndUpdate(result);
        } catch (err) {
            throw new Error(err);
        }
    };

    const remove = async (id) => {
        try {
            const participant = await db.query(Query().FIND_PARTICIPANT, [id]);
            if(participant.rowCount !== 0) return `Social gathering with value ID ${id} can't be deleted, because it already has participant`
            const result = await db.query(Query().DELETE_SG, [id]);
            if (result.rowCount === 0) return `Social gathering with value ID ${id} not found`;
            return `Social gathering with value ID ${id} successfully deleted`;
        } catch (err) {
            throw new Error(err);
        }
    };

    return { create, list, getById, update, remove };
}

module.exports = SocialGatheringRepository;