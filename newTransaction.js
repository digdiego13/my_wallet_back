
import connection from './database.js';
import dayjs from 'dayjs';
import { newCashSchema, signUpSchema } from './validations.js';

async function newTransaction (req, res) {
    let {
        transaction,
        description
    } = req.body;

    const isCorrectBody = newCashSchema.validate(req.body);

    if(isCorrectBody.error) {
        return res.status(400).send(`${isCorrectBody.error.details[0].message}`)
    }
    const type = req.params.type
    if(type === 'spend') {
        transaction = transaction * -1;
    };

    const date = dayjs().format('YYYY-MM-DD');
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    try {
        const result = await connection.query(`
        SELECT * FROM sessions WHERE token = $1;
        `, [token]);

        if(result.rowCount === 0) return res.status(401).send("You are not logged in");
        const userId = result.rows[0].userId;

        await connection.query(`
        INSERT INTO cash ("userId", box, date, description) VALUES ($1, $2, $3, $4)
        `, [userId, transaction, date, description])

        res.sendStatus(200);

    } 
    catch (error) {
        res.sendStatus(500);
    }
}

export {
    newTransaction
}