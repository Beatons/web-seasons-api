import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Data } from '.'

const app = () => express(routes)

let userSession, anotherSession, data

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  data = await Data.create({ user })
})

test('POST /data 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, user_token: 'test', seasons: 'test', games: 'test', players: 'test', teams: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user_token).toEqual('test')
  expect(body.seasons).toEqual('test')
  expect(body.games).toEqual('test')
  expect(body.players).toEqual('test')
  expect(body.teams).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /data 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /data 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /data 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /data/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${data.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(data.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /data/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${data.id}`)
  expect(status).toBe(401)
})

test('GET /data/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /data/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${data.id}`)
    .send({ access_token: userSession, user_token: 'test', seasons: 'test', games: 'test', players: 'test', teams: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(data.id)
  expect(body.user_token).toEqual('test')
  expect(body.seasons).toEqual('test')
  expect(body.games).toEqual('test')
  expect(body.players).toEqual('test')
  expect(body.teams).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /data/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${data.id}`)
    .send({ access_token: anotherSession, user_token: 'test', seasons: 'test', games: 'test', players: 'test', teams: 'test' })
  expect(status).toBe(401)
})

test('PUT /data/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${data.id}`)
  expect(status).toBe(401)
})

test('PUT /data/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, user_token: 'test', seasons: 'test', games: 'test', players: 'test', teams: 'test' })
  expect(status).toBe(404)
})

test('DELETE /data/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${data.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /data/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${data.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /data/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${data.id}`)
  expect(status).toBe(401)
})

test('DELETE /data/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
