import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Data, { schema } from './model'

const router = new Router()
const { seasons, games, players, teams } = schema.tree

/**
 * @api {post} /data Create data
 * @apiName CreateData
 * @apiGroup Data
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user_token Data's user_token.
 * @apiParam seasons Data's seasons.
 * @apiParam games Data's games.
 * @apiParam players Data's players.
 * @apiParam teams Data's teams.
 * @apiSuccess {Object} data Data's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ seasons, games, players, teams }),
  create)

/**
 * @api {get} /data Retrieve data
 * @apiName RetrieveData
 * @apiGroup Data
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} data List of data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /data/:id Retrieve data
 * @apiName RetrieveData
 * @apiGroup Data
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} data Data's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /data/:id Update data
 * @apiName UpdateData
 * @apiGroup Data
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user_token Data's user_token.
 * @apiParam seasons Data's seasons.
 * @apiParam games Data's games.
 * @apiParam players Data's players.
 * @apiParam teams Data's teams.
 * @apiSuccess {Object} data Data's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ seasons, games, players, teams }),
  update)

/**
 * @api {delete} /data/:id Delete data
 * @apiName DeleteData
 * @apiGroup Data
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Data not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
