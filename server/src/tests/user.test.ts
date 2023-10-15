import request from 'supertest'
import app from '../app'
import User from '../models/user';
import {userOne, setupDatabase} from './fixtures/db'

beforeEach(setupDatabase)

test('Should signup a new user ', async () => {
    const response = await request(app).post('/users/signup').send({
        email: 'alina@exampletest.com',
        password: 'MyPass777'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            email: 'alina@exampletest.com',
        },
        token: user!.tokens[0].token
    })
    expect(user!.password).not.toBe('MyPass777')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOne._id)
    expect(response.body.token).toBe(user!.tokens[1].token)

})

test('Should not login user with bad credential', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'failingPassword'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should  not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

//TODO
// test('Should update valid user fields', async () => {})
// test('Should not update invalid user fields', async () => {})
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated
