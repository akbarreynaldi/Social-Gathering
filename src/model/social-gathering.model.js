SocialGathering = (id, name, amount, totalAmount, maxParticipants, participantArr, periodic, startDate, endDate, createdAt, updatedAt) => {
    return {
        id,
        name,
        amount,
        totalAmount,
        maxParticipants,
        participant: participantArr,
        periodic,
        startDate,
        endDate,
        createdAt,
        updatedAt
    }
}

module.exports = SocialGathering;