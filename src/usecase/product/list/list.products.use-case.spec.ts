import { ListProductsUseCase } from "./list.products.use-case"

function mockRepository() {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([{
      id: '1',
      name: 'Product 1',
      price: 10
    }, {
      id: '2',
      name: 'Product 2',
      price: 20
    }])
  }
}

describe('list products use case tests', () => {
  it('should list products', async () => {
    const useCase = new ListProductsUseCase(mockRepository())

    const output = await useCase.execute()

    expect(output.length).toBe(2)
    expect(output[0].id).toBe('1')
    expect(output[0].name).toBe('Product 1')
    expect(output[0].price).toBe(10)
    expect(output[1].id).toBe('2')
    expect(output[1].name).toBe('Product 2')
    expect(output[1].price).toBe(20)
  })
})