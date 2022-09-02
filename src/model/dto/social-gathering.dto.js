const SocialGatheringDto = () => {
    const list = (result, participant, index = 0) => {
        return {
            id: result.rows[index]['id'],
            name: result.rows[index]['name'],
            amount: result.rows[index]['amount'],
            totalAmount: result.rows[index]['total_amount'],
            MaxParticipants: result.rows[index]['max_participants'],
            participant,
            periodic: result.rows[index]['periodic'],
            startDate: result.rows[index]['start_date'],
            endDate: result.rows[index]['end_date'],
            createdAt: result.rows[index]['created_at'],
            updatedAt: result.rows[index]['updated_at'],
        }
    }

    const createAndUpdate = (result, index = 0) => {
        return {
            id: result.rows[index]['id'],
            name: result.rows[index]['name'],
            amount: result.rows[index]['amount'],
            totalAmount: result.rows[index]['total_amount'],
            MaxParticipants: result.rows[index]['max_participants'],
            periodic: result.rows[index]['periodic'],
            startDate: result.rows[index]['start_date'],
            endDate: result.rows[index]['end_date'],
            createdAt: result.rows[index]['created_at'],
            updatedAt: result.rows[index]['updated_at'],
        }
    }

    return { list, createAndUpdate }
};

module.exports = SocialGatheringDto;