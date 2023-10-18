import request from 'supertest'
import app from '../app'
import Habit from '../models/habit'
import {userOne, setupDatabase, userTwo, habitOne} from './fixtures/db'

beforeEach(setupDatabase)

test('Should create a habit for user', async () => {
    const response = await request(app)
        .post('/habits')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Drink Water from test'
        })
        .expect(201)

    const habit = await Habit.findById(response.body._id)
    expect(habit).not.toBeNull()
    expect(habit!.completion).toEqual(false)
})

test('Should not be able to create a habit with invalid description', async () => {
    const response = await request(app)
        .post('/habits')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: ''
        })
        .expect(400)

    const habit = await Habit.findById(response.body._id)
    expect(habit).toBeNull()
})
test('Get all the habits from a user', async () => {
    const response = await request(app)
        .get('/habits')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const habits = await Habit.find({owner: userOne})
    expect(habits.length).toBe(2)
})

test('User should not delete the habit he did not create', async () => {
    const response = await request(app)
        .delete(`/habits/${habitOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const habit = await Habit.findById(habitOne._id)
    expect(habit).not.toBeNull()
})

test('User should not delete if not authenticated', async () => {
    await request(app)
        .delete(`/habits/${habitOne._id}`)
        .send()
        .expect(401)

    const habit = await Habit.findById(habitOne._id)
    expect(habit).not.toBeNull()
})

test('Should delete authorized user habit', async () => {
    const response = await request(app)
        .delete(`/habits/${habitOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const habit = await Habit.findById(response.body._id)
    expect(habit).toBeNull()
})

test('Should not update other users habits', async () => {
    await request(app)
        .patch(`/habits/${habitOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description: 'I am breaking in'
        })
        .expect(404)

    const habit = await Habit.findById(habitOne._id)
    expect(habitOne.description).toBe('Drink Water from test suit')
})


//TODO
// Should fetch user habit by id
// Should not fetch user habit by id if unauthenticated
// Should not fetch other users habit by id
// Should sort habits by description/completed/createdAt/updatedAt
// Should fetch page of habits
