import { Router } from "express";
import { ListProductsUseCase } from "../../../usecase/product/list/list.products.use-case";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.use-case";

export const productRouter = Router()

productRouter.get('/', async (req, res) => {
  const useCase = new ListProductsUseCase(new ProductRepository())

  const output = await useCase.execute()

  res.send(output)
})

productRouter.post('/', async (req, res) => {
  const useCase = new CreateProductUseCase(new ProductRepository())

  try {
    const output = await useCase.execute({
      name: req.body.name,
      price: req.body.price
    })

    return res.send(output)
  } catch (err) {
    return res.status(500).send(err)
  }
})