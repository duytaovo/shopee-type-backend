import commonProductRouter from "./common-product.route";

const commonRoutes ={
  prefix:"/",
  routes:[
    {
      path:"products",
      route:commonProductRouter
    }
  ]
}

export default commonRoutes