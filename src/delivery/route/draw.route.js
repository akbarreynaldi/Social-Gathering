const express = require('express');
const router = express.Router();

const DrawRoute = (drawController) => {
    const { create, list, getById } = drawController();

    router.post('/', create);
    router.get('/', list);
    router.get('/:id', getById);
    return router;
}

module.exports = DrawRoute;