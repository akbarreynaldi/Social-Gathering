const SocialGatheringService = (socialGatheringRepo) => {
    const { create, list, getById, update, remove } = socialGatheringRepo;

    const register = async (payload) => {
        try {
            return await create(payload);
        } catch (err) {
            throw new Error(err);
        }
    };

    const findAll = async () => {
        try {
            return await list();
        } catch (err) {
            throw new Error(err);
        }
    };

    const findByPk = async (id) => {
        try {
            return await getById(id);
        } catch (err) {
            throw new Error(err);
        }
    };

    const edit = async (id, payload) => {
        try {
            return await update(id, payload);
        } catch (err) {
            throw new Error(err);
        }
    };

    const destroy = async (id) => {
        try {
            return await remove(id);
        } catch (err) {
            throw new Error(err);
        }
    };

    return { register, findAll, findByPk, edit, destroy };
}

module.exports = SocialGatheringService;