const GeneratorDate = (startDate, period, maxParticipants) => {
    if (period.toLowerCase() === 'weeks') {
        let endDate = startDate.setDate(startDate.getDate()+(maxParticipants * 7))
        return new Date(endDate)
    } else if (period.toLowerCase() === 'months') {
        let endDate = startDate.setMonth(startDate.getMonth()+maxParticipants)
        return new Date(endDate)
    }
}

module.exports = GeneratorDate;