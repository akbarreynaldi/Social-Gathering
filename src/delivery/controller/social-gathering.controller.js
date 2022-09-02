const Response = require('../../utils/response.utils')

const SocialGatheringController = () => {
    const create = async (req, res) => {
        try {
            const payload = req.body;
            const newSocialGathering = await req.service.register(payload);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', newSocialGathering));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const list = async (req, res) => {
        try {
            const socialGatherings = await req.service.findAll();
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', socialGatherings));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const getById = async (req, res) => {
        try {
            const id = req.params.id;
            const socialGathering = await req.service.findByPk(id);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', socialGathering));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const update = async (req, res) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            const socialGathering = await req.service.edit(+id, payload);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', socialGathering));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const remove = async (req, res) => {
        try {
            const id = req.params.id;
            const socialGathering = await req.service.destroy(id);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', socialGathering));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    return { create, list, getById, update, remove };
}

module.exports = SocialGatheringController;