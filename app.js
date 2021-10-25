import express from 'express';
import connection from './database.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs'

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

app.get("/main", async(req, res) => {
    

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
        console.log(user)
  if(user) {
    //found the user in dataBase.
    const boxPromise = await connection.query(`
        SELECT * FROM cash
        WHERE "userId" = $1
    `, [user.userId]);
    console.log(boxPromise.rows);

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
        
    } catch (error) {
        res.sendStatus(500)
    }
});

app.post("/cash/:type", async(req, res) => {
    
    let {
        transaction,
        description
    } = req.body;

    const type = req.params.type
    if(type === 'spend') {
        transaction = transaction * -1;
    };


    const date = dayjs().format('YYYY-MM-DD');
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);


    try {
        console.log('ok')
        const result = await connection.query(`
        SELECT * FROM sessions WHERE token = $1;
    `, [token]);
        if(result.rowCount === 0) return res.status(401).send("You are not logged in")
        const userId = result.rows[0].userId;
        console.log(userId)
        await connection.query(`
        INSERT INTO cash ("userId", box, date, description) VALUES ($1, $2, $3, $4)
        `, [userId, transaction, date, description])

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});


app.get("/status", (req, res) => {
    // Manda como resposta o texto 'Hello World'
    res.send('Hello World');
});



export default app;