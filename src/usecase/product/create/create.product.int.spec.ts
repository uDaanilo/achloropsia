import { Sequelize } from "sequelize-typescript"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import { CreateProductUseCase } from "./create.product.use-case"

describe("create product integration tests", () => {
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
  
  it("should create a product", async () => {
    const repository = new ProductRepository()
    const useCase = new CreateProductUseCase(repository)

    const input = {
      name: "Product 1",
      price: 10
    }

    const output = await useCase.execute(input)
    const createdProduct = await repository.find(output.id)

    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.price).toBe(input.price)

    expect(createdProduct?.id).toBe(output.id)
    expect(createdProduct?.name).toBe(output.name)
    expect(createdProduct?.price).toBe(output.price)
  })
})