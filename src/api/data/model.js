import mongoose, { Schema } from 'mongoose'

const dataSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  seasons: {
    type: Array
  },
  games: {
    type: Array
  },
  players: {
    type: Array
  },
  teams: {
    type: Array
  }
}, {
  timestamps: true
})

dataSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      user_token: this.user_token,
      seasons: this.seasons,
      games: this.games,
      players: this.players,
      teams: this.teams,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Data', dataSchema)

export const schema = model.schema
export default model
