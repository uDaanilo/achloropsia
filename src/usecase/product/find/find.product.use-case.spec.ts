import { FindProductUseCase } from "./find.product.use-case"

function mockRepository() {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue({
      id: '1',
      name: 'Product 1',
      price: 10
    }),
    findAll: jest.fn()
  }
}

describe('find product use case tests', () => {
  it('should find a product', async () => {
    const useCase = new FindProductUseCase(mockRepository())
    const input = {
      id: '1'
    }

    const output = await useCase.execute(input)

    expect(output.id).toBe('1')
    expect(output.name).toBe('Product 1')
    expect(output.price).toBe(10)
  })

  it('should throw an error when id is missing', async () => {
    const useCase = new FindProductUseCase(mockRepository())
    const input = {
      id: ''
    }

    await expect(useCase.execute(input)).rejects.toThrow('Id is required')
  })
})