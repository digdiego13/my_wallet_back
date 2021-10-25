import connection from './database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function signIn(req, res) {
    const {
        email,
        password
    } = req.body;
    
    try {
        const result = await connection.query(`
        SELECT * FROM users
        WHERE email = $1
    `,[email]);

    const user = result.rows[0];
    if(user && bcrypt.compareSync(password, user.password)) {
        // sucesso, usuário encontrado com este email e senha!

        const token = uuid()
        await connection.query(`
          INSERT INTO sessions ("userId", token)
          VALUES ($1, $2)
        `, [user.id, token]);

        res.send({name: user.name, token});
    } else {
        // usuário não encontrado (email ou senha incorretos)
        res.sendStatus(403)
    }
    } catch (error) {
        res.sendStatus(500) 
    }
}


async function singUp (req, res) {

    const { username, email, password } = req.body;
    const isCorrectBody = signUpSchema.validate(req.body);

    if(isCorrectBody.error) {
        return res.status(400).send(`${isCorrectBody.error.details[0].message}`)
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    try{
        const existEmail = await connection.query(`
        SELECT * FROM users
        WHERE email = $1
    `, [email])

    if(existEmail.rowCount !== 0 ) {
        return res.sendStatus(403);
    }

    await connection.query(`
        INSERT INTO users
        (name, email, password)
        VALUES ($1, $2, $3)
    `,[username, email, passwordHash]);

    res.sendStatus(201);
    }
    catch(erro){
        res.sendStatus(500);
    }
}


async function signOut (req, res) {

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    await connection.query(`
        DELETE FROM sessions WHERE token = $1
    `,[token]);

    res.sendStatus(200);
}

export {
    signIn,
    singUp,
    signOut
}