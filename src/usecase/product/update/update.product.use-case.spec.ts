import Product from "../../../domain/product/entity/product"
import { UpdateProductUseCase } from "./update.product.use-case"

const mockProduct = new Product('1', 'Product 1', 10)

function mockRepository() {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn()
  }
}

describe('update product use case tests', () => {
  it('should update a product', async () => {
    const useCase = new UpdateProductUseCase(mockRepository())
    const input = {
      id: '1',
      name: 'Product 2',
      price: 10
    }

    const output = await useCase.execute(input)

    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.price).toBe(input.price)
  })
})