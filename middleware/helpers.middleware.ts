import { Request, Response, NextFunction } from 'express'
import { validationResult, check, body } from 'express-validator'
import { ErrorHandler, responseError } from '../utils/response'
import { STATUS } from '../constants/status'

const idValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const error: ErrorThrow = errors
    .array()
    .reduce((result: any, item, index) => {
      result[item.param] = item.msg
      return result
    }, {})
  return responseError(res, new ErrorHandler(STATUS.BAD_REQUEST, error))
}

const entityValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const error: ErrorThrow = errors
    .array({ onlyFirstError: true })
    .reduce((result: any, item, index) => {
      result[item.param] = item.msg
      return result
    }, {})

  return responseError(
    res,
    new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, error)
  )
}
const helpersMiddleware = {
  idValidator,
  entityValidator
}
export default helpersMiddleware