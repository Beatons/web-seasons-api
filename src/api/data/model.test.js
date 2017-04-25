import { Data } from '.'
import { User } from '../user'

let user, data

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  data = await Data.create({ user, user_token: 'test', seasons: 'test', games: 'test', players: 'test', teams: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = data.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(data.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.user_token).toBe(data.user_token)
    expect(view.seasons).toBe(data.seasons)
    expect(view.games).toBe(data.games)
    expect(view.players).toBe(data.players)
    expect(view.teams).toBe(data.teams)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = data.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(data.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.user_token).toBe(data.user_token)
    expect(view.seasons).toBe(data.seasons)
    expect(view.games).toBe(data.games)
    expect(view.players).toBe(data.players)
    expect(view.teams).toBe(data.teams)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
