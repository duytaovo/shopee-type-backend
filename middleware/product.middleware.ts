import { body, query } from 'express-validator'
import { isMongoId } from '../utils/validate'

const getProductsRules = () => {
  return [
    query('page')
      .if((value) => value !== undefined)
      .isInt()
      .withMessage('page không đúng định dạng'),
    query('limit')
      .if((value) => value !== undefined)
      .isInt()
      .withMessage('limit không đúng định dạng'),
    query('category')
      .if((value: any) => value !== undefined)
      .isMongoId()
      .withMessage('category không đúng định dạng'),
    query('exclude')
      .if((value: any) => value !== undefined)
      .isMongoId()
      .withMessage('exclude không đúng định dạng'),
  ]
}


const ProductMiddleware = {
  getProductsRules,
}

export default ProductMiddleware
