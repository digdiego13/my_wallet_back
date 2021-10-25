
import connection from './database.js';
import dayjs from 'dayjs';

async function getMainList (req, res) {

    const today = dayjs().format('YYYY/MM/DD')
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    try {
        const result = await connection.query(`
        SELECT * FROM sessions
        JOIN users
        ON sessions."userId" = users.id
        WHERE sessions.token = $1
        `, [token]);

        const user = result.rows[0];
        if(user) {
            //found the user in dataBase.
            const boxPromise = await connection.query(`
                SELECT * FROM cash
                WHERE "userId" = $1
            `, [user.userId]);

            boxPromise.rows.forEach(item => {
                item.date = dayjs(item.date).format('YYYY-MM-DD');
                item.box = Number(item.box).toFixed(2);
            }
            )

            res.send(boxPromise.rows);

        } else {
            //usuario deve relogar
            res.sendStatus(401);
        }
            
    } 
    catch (error) {
        res.sendStatus(500)
    }
}

export {
    getMainList
}