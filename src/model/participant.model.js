Participant = (
    id,
    sgId,
    sgName,
    sgAmount,
    sgTotalAmount,
    sgMaxParticipants,
    sgPeriodic,
    sgStartDate,
    sgEndDate,
    sgCreatedAt,
    sgUpdatedAt,
    name,
    address,
    contactPerson,
    balance,
    isStatus,
    isPayment,
    createdAt,
    updatedAt
) => {
    return {
        id,
        name,
        address,
        contactPerson,
        balance,
        isStatus,
        isPayment,
        socialGathering: {
            sgId,
            sgName,
            sgAmount,
            sgTotalAmount,
            sgMaxParticipants,
            sgPeriodic,
            sgStartDate,
            sgEndDate,
            sgCreatedAt,
            sgUpdatedAt,
        },
        createdAt,
        updatedAt
    }
}

module.exports = Participant;