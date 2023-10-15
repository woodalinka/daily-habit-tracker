import request from 'supertest'
import app from '../app'
import Habit from '../models/habit'
import {userOne, setupDatabase} from './fixtures/db'

beforeEach(setupDatabase)

test('Should create a habit for user', async () => {

})
