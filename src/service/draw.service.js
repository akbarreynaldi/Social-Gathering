const DrawService = (drawRepo) => {
    const { create, list, getById } = drawRepo;

    const makeDraw = async (payload) => {
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


    return { makeDraw, findAll, findByPk };
}

module.exports = DrawService;