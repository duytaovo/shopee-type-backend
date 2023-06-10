import { ROUTE_IMAGE } from "../constants/config"
import { ProductModel } from "../databases/models/product.model"


export const handleImageProduct = (product) => {
  if (product.image !== undefined && product.image !== '') {
    product.image = HOST + `/${ROUTE_IMAGE}/` + product.image
  }
  if (product.images !== undefined && product.images.length !== 0) {
    product.images = product.images.map((image) => {
      return image !== '' ? HOST + `/${ROUTE_IMAGE}/` + image : ''
    })
  }
  return product
}

const getProducts = async (req: Request, res: Response) => {
  let {
    page = 1,
    limit = 30,
    category,
    exclude,
    sort_by,
    order,
    rating_filter,
    price_max,
    price_min,
    name,
  } = req.query as {
    [key: string]: string | number
  }

  page = Number(page)
  limit = Number(limit)
  let condition: any = {}
  if (category) {
    condition.category = category
  }
  if (exclude) {
    condition._id = { $ne: exclude }
  }
  if (rating_filter) {
    condition.rating = { $gte: rating_filter }
  }
  if (price_max) {
    condition.price = {
      $lte: price_max,
    }
  }
  if (price_min) {
    condition.price = condition.price
      ? { ...condition.price, $gte: price_min }
      : { $gte: price_min }
  }
  if (!ORDER.includes(order as string)) {
    order = ORDER[0]
  }
  if (!SORT_BY.includes(sort_by as string)) {
    sort_by = SORT_BY[0]
  }
  if (name) {
    condition.name = {
      $regex: name,
      $options: 'i',
    }
  }
  let [products, totalProducts]: [products: any, totalProducts: any] =
    await Promise.all([
      ProductModel.find(condition)
        .populate({
          path: 'category',
        })
        .sort({ [sort_by]: order === 'desc' ? -1 : 1 })
        .skip(page * limit - limit)
        .limit(limit)
        .select({ __v: 0, description: 0 })
        .lean(),
      ProductModel.find(condition).countDocuments().lean(),
    ])
  products = products.map((product) => handleImageProduct(product))
  const page_size = Math.ceil(totalProducts / limit) || 1
  const response = {
    message: 'Lấy các sản phẩm thành công',
    data: {
      products,
      pagination: {
        page,
        limit,
        page_size,
      },
    },
  }
  return responseSuccess(res, response)
}

const ProductController = {
  getProducts,

}

export default ProductController