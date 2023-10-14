import request from 'supertest'
import app from '../app'

import User from '../models/user';

const userOne = {
    email: 'alina@test.com',
    password: '1234567!'
}

beforeEach(async () => {
  await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user ', async () => {
    await request(app).post('/users/signup').send({
        email: 'alina@exampletest.com',
        password: 'MyPass777'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login user with bad credential', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'failingPassword'
    }).expect(400)
})