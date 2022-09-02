Payment = (id, participantId, socialGatheringId, amount, date, createdAt, updatedAt) => {
    return {
        id,
        participantId,
        socialGatheringId,
        amount,
        date,
        createdAt,
        updatedAt
    }
}

module.exports = Payment;