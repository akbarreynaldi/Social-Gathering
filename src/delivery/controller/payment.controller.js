const Response = require('../../utils/response.utils')

const PaymentController = () => {
    const create = async (req, res) => {
        try {
            const payload = req.body;
            const newPayment = await req.service.makePayment(payload);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', newPayment));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const list = async (req, res) => {
        try {
            const payments = await req.service.findAll();
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', payments));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    const getById = async (req, res) => {
        try {
            const id = req.params.id;
            const payment = await req.service.findByPk(id);
            res.json(Response().successMessage(res.statusCode, 'SUCCESS', payment));
        } catch (err) {
            res.status(400).json(Response().errorMessage(res.statusCode, err.message));
        }
    }

    return { create, list, getById };
}

module.exports = PaymentController;