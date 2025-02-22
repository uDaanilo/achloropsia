import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { CreateProductUseCase } from "./create.product.use-case";

function mockRepository() {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn()
  }
}

describe('create product use case tests', () => {
  it('should create a new product', async () => {
    const useCase = new CreateProductUseCase(mockRepository())
    const input = {
      name: 'Product 1',
      price: 10
    }

    const output = await useCase.execute(input)

    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.price).toBe(input.price)
  })

  it('should throw an error when name is missing', async () => {
    const useCase = new CreateProductUseCase(mockRepository())
    const input = {
      name: '',
      price: 10
    }

    await expect(useCase.execute(input)).rejects.toThrow('Name is required')
  })
});
