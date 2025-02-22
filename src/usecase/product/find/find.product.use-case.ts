import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { FindProductUseCaseDtoInput, FindProductUseCaseDtoOutput } from "./find.product.use-case.dto";

export class FindProductUseCase {
  constructor(
    private repository: ProductRepositoryInterface
  ) {}

  async execute(input: FindProductUseCaseDtoInput): Promise<FindProductUseCaseDtoOutput> {
    if (!input.id) {
      throw new Error('Id is required')
    }

    const product = await this.repository.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}