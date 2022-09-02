const Response = require('../../utils/response.utils')

const ParticipantController = () => {
    const create = async (req, res) => {
        try {
            const payload = req.body;
            const newParticipant = await req.service.register(payload);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', newParticipant));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const list = async (req, res) => {
        try {
            const participants = await req.service.findAll();
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', participants));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const getById = async (req, res) => {
        try {
            const id = req.params.id;
            const participant = await req.service.findByPk(id);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', participant));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const update = async (req, res) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            const participant = await req.service.edit(+id, payload);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', participant));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const updateBalance = async (req, res) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            const participant = await req.service.topUpBalance(+id, payload);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', participant));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const remove = async (req, res) => {
        try {
            const id = req.params.id;
            const participant = await req.service.destroy(id);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', participant));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    return { create, list, getById, update, updateBalance, remove };
}

module.exports = ParticipantController;