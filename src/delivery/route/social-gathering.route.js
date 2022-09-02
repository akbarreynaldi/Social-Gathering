const express = require('express');
const router = express.Router();

const SocialGatheringRoute = (socialGatheringController) => {
    const { create, list, getById, update, remove } = socialGatheringController();

    router.post('/', create);
    router.get('/', list);
    router.get('/:id', getById);
    router.put('/:id', update);
    router.delete('/:id', remove);
    return router;
}

module.exports = SocialGatheringRoute;