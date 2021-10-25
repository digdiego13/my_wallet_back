import app from './app.js';
import supertest from 'supertest';
import connection from './database.js';
import bcrypt from 'bcrypt';

describe("POST /sign-in", ()=> {

    
    const body = {
        email: "didi@gmail.com",
        password:"123456"
    }

    const passwordHash = bcrypt.hashSync(body.password, 10);
    const username = "Dieguinho";

    beforeAll(async ()=> {


        await connection.query(`
        INSERT INTO users
        (name, email, password)
        VALUES ($1, $2, $3);
    `,[username, body.email, passwordHash]);

    })

    afterAll(async ()=> {

        await connection.query(`
            DELETE FROM users WHERE email = 'didi@gmail.com';
        `)
        connection.end();
    })

    test("Returns 403 if there is no matches between email and password in databank", async() => {
        body.password = "wrongPassowrd";
        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        body.password = "123456"
        expect(status).toEqual(403);
    })

    test("Returns 200 if there is email in databank", async() => {

        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        
        expect(status).toEqual(200);
        expect(result.body).toEqual({
            name: username,
            token: expect.any(String)
        })
    })

    test("Returns 500 if there is something Wrong", async() => {
        const body = {}
        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        
        expect(status).toEqual(500);
    })

})