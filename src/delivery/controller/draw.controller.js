const Response = require('../../utils/response.utils')

const DrawController = () => {
    const create = async (req, res) => {
        try {
            const payload = req.body;
            const newDraw = await req.service.makeDraw(payload);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', newDraw));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const list = async (req, res) => {
        try {
            const draws = await req.service.findAll();
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', draws));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const getById = async (req, res) => {
        try {
            const id = req.params.id;
            const draw = await req.service.findByPk(id);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', draw));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    return { create, list, getById };
}

module.exports = DrawController;