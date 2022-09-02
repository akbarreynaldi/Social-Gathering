const PaymentDto = (result, participant, sg, index = 0) => {
    return {
        paymentId: result.rows[index]['id'],
        participant: {
            id :participant.rows[0]['id'],
            mame: participant.rows[0]['name'],
            contactPerson: participant.rows[0]['contact_person'],
            balance: participant.rows[0]['balance'],
            isPayment: participant.rows[0]['is_payment']
        },
        socialGathering: {
            id: sg.rows[0]['id'],
            name: sg.rows[0]['name'],
            amount: sg.rows[0]['amount'],
            totalAmount: sg.rows[0]['total_amount'],
        },
        paymentAmount: result.rows[index]['amount'],
        paymentDate: result.rows[index]['date'],
        createdAt: result.rows[index]['created_at'],
        updatedAt: result.rows[index]['updated_at']
    }
};

module.exports = PaymentDto;