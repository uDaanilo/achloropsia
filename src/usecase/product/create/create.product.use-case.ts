import { v4 } from "uuid";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { CreateProductDtoInput, CreateProductDtoOutput } from "./create.product.dto";

export class CreateProductUseCase {
  constructor(
    private repository: ProductRepositoryInterface
  ) {}

  async execute(input: CreateProductDtoInput): Promise<CreateProductDtoOutput> {
    const product = new Product(v4(), input.name, input.price)
    
    await this.repository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}