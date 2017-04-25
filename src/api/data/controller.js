import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Data } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Data.create({ ...body, user })
    .then((data) => data.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Data.find(query, select, cursor)
    .populate('user')
    .then((data) => data.map((data) => data.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Data.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((data) => data ? data.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Data.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((data) => data ? _.merge(data, body).save() : null)
    .then((data) => data ? data.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Data.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((data) => data ? data.remove() : null)
    .then(success(res, 204))
    .catch(next)
