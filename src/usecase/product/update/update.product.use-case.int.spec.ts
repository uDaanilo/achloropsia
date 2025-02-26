import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import Product from "../../../domain/product/entity/product"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { UpdateProductUseCase } from "./update.product.use-case"

describe("update product integration tests", () => {
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

  afterEach(async () => {
    await sequelize.close()
  })

  it("should update a product", async () => {
    const product = new Product('1', 'Product 1', 10)
    const repository = new ProductRepository()

    await repository.create(product)

    const useCase = new UpdateProductUseCase(repository)

    const input = {
      id: product.id,
      name: "Product 2",
      price: 20
    }

    await useCase.execute(input)

    const dbProduct = await repository.find(product.id)

    expect(dbProduct.id).toBe(product.id)
    expect(dbProduct.name).toBe(input.name)
    expect(dbProduct.price).toBe(input.price)
  })
})