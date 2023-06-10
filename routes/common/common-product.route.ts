import { Router } from 'express'
import ProductController from '../../controllers/product.controller'
import { wrapAsync } from '../../utils/response'
import ProductMiddleware from '../../middleware/product.middleware'
import helpersMiddleware from '../../middleware/helpers.middleware'



const commonProductRouter = Router()

commonProductRouter.get(
  '',
  ProductMiddleware.getProductsRules(),
  helpersMiddleware.entityValidator,
  wrapAsync(ProductController.getProducts)
)

export default commonProductRouter