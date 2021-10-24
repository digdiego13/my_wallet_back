import express from 'express';
import connection from './database.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-in", async(req, res) => {

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
    console.log("ok")
    console.log(bcrypt.compareSync(password, user.password));
    console.log("ok")
    if(user && bcrypt.compareSync(password, user.password)) {
        // sucesso, usuário encontrado com este email e senha!
        console.log("ok")
        const token = uuid()
        console.log(token)
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
})

app.post("/sign-up", async (req, res) => {
    const { username, email, password } = req.body;
    
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
    
});


app.get("/status", (req, res) => {
    // Manda como resposta o texto 'Hello World'
    res.send('Hello World');
});


export default app;