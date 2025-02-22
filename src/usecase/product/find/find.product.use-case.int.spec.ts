import { Sequelize } from "sequelize-typescript"
import { FindProductUseCase } from "./find.product.use-case"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"

describe('find product use case tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      })
  
      sequelize.addModels([ProductModel])
      await sequelize.sync()
    })
  

  it('should find a product', async () => {
    const repository = new ProductRepository()
    const useCase = new FindProductUseCase(repository)

    const product = new Product('1', 'Product 1', 10)
    await repository.create(product)

    const input = {
      id: product.id
    }

    const output = await useCase.execute(input)

    expect(output.id).toBe(product.id)
    expect(output.name).toBe(product.name)
    expect(output.price).toBe(product.price)
  })

  it('should throw an error when id is missing', async () => {
    const repository = new ProductRepository()
    const useCase = new FindProductUseCase(repository)
    const input = {
      id: ''
    }

    await expect(useCase.execute(input)).rejects.toThrow('Id is required')
  })
})