import express from 'express';
import cors from 'cors';
import { newCashSchema, signUpSchema } from './validations.js';
import { signIn, signOut, singUp } from './userTransition.js';
import { getMainList } from './mainList.js';
import { newTransaction } from './newTransaction.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-in", signIn)
app.post("/sign-up", singUp);
app.get("/main", getMainList);
app.post("/cash/:type", newTransaction);
app.post("/sign-out",signOut)

app.get("/status", (req, res) => {
    // Manda como resposta o texto 'Hello World'
    res.send('Hello World');
});

export default app;