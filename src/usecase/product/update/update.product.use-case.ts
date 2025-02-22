import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { UpdateProductUseCaseDtoInput, UpdateProductUseCaseDtoOutput } from "./update.product.use-case.dto"

export class UpdateProductUseCase {
  constructor(private readonly repository: ProductRepositoryInterface) {}

  async execute(input: UpdateProductUseCaseDtoInput): Promise<UpdateProductUseCaseDtoOutput> {
    const product = await this.repository.find(input.id)

    product.changeName(input.name)
    product.changePrice(input.price)

    await this.repository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}