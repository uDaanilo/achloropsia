import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { ListProductsUseCaseDtoInput, ListProductsUseCaseDtoOutput } from "./list.products.use-case.dto"

export class ListProductsUseCase {
  constructor(
    private repository: ProductRepositoryInterface
  ) {}

  async execute(_input: ListProductsUseCaseDtoInput): Promise<ListProductsUseCaseDtoOutput[]> {
    const products = await this.repository.findAll()

    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price
    }))
  }
}