import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import Product from "../../../domain/product/entity/product"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { ListProductsUseCase } from "./list.products.use-case"

describe("list products integration tests", () => {
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

  it("should list products", async () => {
    const product1 = new Product('1', 'Product 1', 10)
    const product2 = new Product('2', 'Product 2', 20)

    const repository = new ProductRepository()
    const useCase = new ListProductsUseCase(repository)
    
    await Promise.all([
      repository.create(product1),
      repository.create(product2),
    ])

    const output = await useCase.execute()

    expect(output).toHaveLength(2)
    expect(output[0].id).toBe(product1.id)
    expect(output[0].name).toBe(product1.name)
    expect(output[0].price).toBe(product1.price)
    expect(output[1].id).toBe(product2.id)
    expect(output[1].name).toBe(product2.name)
    expect(output[1].price).toBe(product2.price)
  })
})