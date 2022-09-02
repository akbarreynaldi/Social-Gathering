const express = require('express');
const router = express.Router();
const SocialGatheringRoute = require('./social-gathering.route');
const SocialGatheringController = require('../controller/social-gathering.controller');
const SocialGatheringService = require('../../service/social-gathering.service');
const SocialGatheringRepository = require('../../repository/social-gathering.repository');
const ParticipantRoute = require('./participant.route');
const ParticipantController = require('../controller/participant.controller');
const ParticipantService = require('../../service/participant.service');
const ParticipantRepository = require('../../repository/participant.repository');
const PaymentRoute = require('./payment.route');
const PaymentController = require('../controller/payment.controller');
const PaymentService = require('../../service/payment.service');
const PaymentRepository = require('../../repository/payment.repository');
const DrawRoute = require('./draw.route');
const DrawController = require('../controller/draw.controller');
const DrawService = require('../../service/draw.service');
const DrawRepository = require('../../repository/draw.repository');
const db = require('../config/db')

const socialGatheringService = (req, res, next) => {
    req.service = SocialGatheringService(SocialGatheringRepository(db));
    next();
}

const participantService = (req, res, next) => {
    req.service = ParticipantService(ParticipantRepository(db));
    next();
}

const paymentService = (req, res, next) => {
    req.service = PaymentService(PaymentRepository(db));
    next();
}

const drawService = (req, res, next) => {
    req.service = DrawService(DrawRepository(db));
    next();
}

router.use('/social-gathering', socialGatheringService, SocialGatheringRoute(SocialGatheringController));
router.use('/participant', participantService, ParticipantRoute(ParticipantController));
router.use('/payment', paymentService, PaymentRoute(PaymentController));
router.use('/draw', drawService, DrawRoute(DrawController));

module.exports = router;