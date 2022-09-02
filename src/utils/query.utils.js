const Query = () => {
    // for social gathering table
    const CREATE_SG = `INSERT INTO social_gathering (name, amount, total_amount, max_participants, periodic, start_date,end_date, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const FIND_ALL_SG = `SELECT * FROM social_gathering`;
    const FIND_SG_BY_PK = `SELECT * FROM social_gathering WHERE id = $1`;
    const UPDATE_SG = `UPDATE social_gathering SET name = $1, amount = $2, max_participants = $3, periodic = $4, start_date = $5, end_date = $6, updated_at = $7 WHERE id = $8 RETURNING *`;
    const UPDATE_TOTAL_AMOUNT_SG = `UPDATE social_gathering SET total_amount = $1, updated_at = $2 WHERE id = $3`
    const RESET_TOTAL_AMOUNT_SG = `UPDATE social_gathering SET total_amount = 0, updated_at = $2 WHERE id = $3`
    const DELETE_SG = `DELETE FROM social_gathering WHERE id = $1`;

    // for participant table
    const CREATE_PARTICIPANT = `INSERT INTO participant (social_gathering_id, name, address, contact_person, balance, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const FIND_ALL_PARTICIPANT = `SELECT * FROM participant`;
    const FIND_PARTICIPANT_BY_PK = `SELECT * FROM participant WHERE id = $1`;
    const FIND_PARTICIPANT = `SELECT * FROM participant WHERE social_gathering_id = $1 AND is_status = false`;
    const FIND_PARTICIPANT_NOT_PAY = `SELECT * FROM participant WHERE social_gathering_id = $1 AND is_payment = false`;
    const UPDATE_PARTICIPANT = `UPDATE participant SET name = $1, address = $2, contact_person = $3, updated_at = $4 WHERE id = $5 RETURNING *`;
    const UPDATE_BALANCE = `UPDATE participant SET balance = $1, updated_at = $2 WHERE id = $3 RETURNING *`;
    const UPDATE_PAYMENT_STATUS = `UPDATE participant SET is_payment = true, updated_at = $1 WHERE id = $2`
    const UPDATE_WINNER = `UPDATE participant SET is_status = true, balance = $1, updated_at = $2 WHERE id = $3`
    const RESET_PAYMENT_STATUS = `UPDATE participant SET is_payment = false, updated_at = $1 WHERE social_gathering_id = $2`
    const DELETE_PARTICIPANT = `DELETE FROM participant WHERE id = $1`;

    // for payment
    const CREATE_PAYMENT = `INSERT INTO payment (social_gathering_id, participant_id, amount, date, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const FIND_ALL_PAYMENT = `SELECT * FROM payment`;
    const FIND_PAYMENT_BY_PK = `SELECT * FROM payment WHERE id = $1`;

    // for draw
    const CREATE_DRAW = `INSERT INTO draw (social_gathering_id, participant_id, amount, date, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const FIND_ALL_DRAW = `SELECT * FROM payment`;
    const FIND_DRAW_BY_PK = `SELECT * FROM payment WHERE id = $1`;

    return {
        CREATE_SG, FIND_ALL_SG, FIND_SG_BY_PK, UPDATE_SG, UPDATE_TOTAL_AMOUNT_SG, RESET_TOTAL_AMOUNT_SG, DELETE_SG, CREATE_PARTICIPANT, FIND_ALL_PARTICIPANT, FIND_PARTICIPANT_BY_PK, FIND_PARTICIPANT, FIND_PARTICIPANT_NOT_PAY, UPDATE_PARTICIPANT, UPDATE_BALANCE, UPDATE_PAYMENT_STATUS, UPDATE_WINNER, RESET_PAYMENT_STATUS, DELETE_PARTICIPANT, CREATE_PAYMENT, FIND_ALL_PAYMENT, FIND_PAYMENT_BY_PK, CREATE_DRAW, FIND_ALL_DRAW, FIND_DRAW_BY_PK
    };
}

module.exports = Query;