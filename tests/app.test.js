import request from 'supertest'
import { app } from '../providers/Express.js';
import { Database } from '../providers/Database.js';

describe("User Management System", () => {
    let c = crypto.randomUUID()
    let userSignUpData = {
        name: `test${c}`,
        email: `test${c}@gmail.com`,
        password: "fgaegbargsargawer"
    }

    let userSignInData = {
        email: `test${c}@gmail.com`,
        password: "fgaegbargsargawer"
    }

    let userToBeCreated = {
        name: `test${c.substring(1, 6)}`,
        email: `test${c.substring(1, 6)}@gmail.com`,
        role: 'user'
    }

    let signUpResponse;
    let signInResponse;
    let userCreatedResponse;



    beforeAll(async () => {
        await Database.init();

    })
    test("User Should be Able to Sign Up", async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send(userSignUpData)

        expect(response.body.data.name).toBe(userSignUpData.name)
        expect(response.body.data.email).toBe(userSignUpData.email)
        expect(response.body.data.role).toBe('user')
        signUpResponse = response.body
    });

    test("User Should Be Able to Login", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send(userSignInData)

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User logged in successfully');
        expect(response.body).toHaveProperty('token');
        expect(response.body.token).toBeDefined();
        signInResponse = response.body
    })

    test("User Should Can Add a User", async () => {
        const response = await request(app)
            .post('/api/users/')
            .send(userToBeCreated)
            .set('Authorization', `Bearer ${signInResponse.token}`);

        expect(response.body.data.name).toBe(userToBeCreated.name)
        expect(response.body.data.email).toBe(userToBeCreated.email)
        expect(response.body.data.role).toBe('user')
        userCreatedResponse = response.body
    })

    test("User Can Get Data By Id", async () => {
        const response = await request(app)
            .get(`/api/users/${userCreatedResponse.data.id}`)
            .set('Authorization', `Bearer ${signInResponse.token}`);

        expect(response.body.data.id).toBe(userCreatedResponse.data.id)
        expect(response.body.data.name).toBe(userCreatedResponse.data.name)
        expect(response.body.data.email).toBe(userCreatedResponse.data.email)
        expect(response.body.data.role).toBe('user')
    })

    test("User Can Update Its Own Data", async () => {
        await request(app).put(`/api/users/${signUpResponse.data.id}`).send({
            email: `test${c.substring(1, 10)}@gmail.com`
        }).set('Authorization', `Bearer ${signInResponse.token}`);

        const response = await request(app).get(`/api/users/${signUpResponse.data.id}`).set('Authorization', `Bearer ${signInResponse.token}`);
        expect(response.body.data.id).toBe(signUpResponse.data.id)
        expect(response.body.data.name).toBe(signUpResponse.data.name)
        expect(response.body.data.email).toBe(`test${c.substring(1, 10)}@gmail.com`)
        expect(response.body.data.role).toBe('user')
    })


    test("Only Admin Can Delete Data", async () => {
        const response = await request(app)
            .delete(`/api/users/${signUpResponse.data.id}`)
            .set('Authorization', `Bearer ${signInResponse.token}`)

        expect(response.error.text).toBe('You are not authorized to perform this action')
    })

})