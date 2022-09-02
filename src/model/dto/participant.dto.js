const ParticipantDto = (result, sg, index = 0) => {
        return {
            id: result.rows[index]['id'],
            socialGathering: {
                id: result.rows[index]['social_gathering_id'],
                name: sg.rows[0]['name'],
                amount: sg.rows[0]['amount'],
                startDate: sg.rows[0]['start_date'],
                endDate: sg.rows[0]['end_date'],
            },
            name: result.rows[index]['name'],
            address: result.rows[index]['address'],
            contactPerson: result.rows[index]['contact_person'],
            balance: result.rows[index]['balance'],
            isStatus: result.rows[index]['isStatus'],
            isPayment: result.rows[index]['isPayment'],
            createdAt: result.rows[index]['created_at'],
            updatedAt: result.rows[index]['updated_at'],
        }
};

module.exports = ParticipantDto;