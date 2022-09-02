const express = require('express');
const router = express.Router();

const PaymentRoute = (paymentController) => {
    const { create, list, getById } = paymentController();

    router.post('/', create);
    router.get('/', list);
    router.get('/:id', getById);
    return router;
}

module.exports = PaymentRoute;