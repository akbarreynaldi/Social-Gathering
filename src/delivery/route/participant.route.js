const express = require('express');
const router = express.Router();

const ParticipantRoute = (participantController) => {
    const { create, list, getById, update, updateBalance, remove } = participantController();

    router.post('/', create);
    router.get('/', list);
    router.get('/:id', getById);
    router.put('/:id', update);
    router.put('/top-up-balance/:id', updateBalance);
    router.delete('/:id', remove);
    return router;
}

module.exports = ParticipantRoute;