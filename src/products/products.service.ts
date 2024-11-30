import { NotFoundException, UnauthorizedException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()

export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) { }
  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const { name, description, price, category } = createProductDto
    const createdBy = user._id
    const product = await this.productModel.create({ name, description, price, category, createdBy })
    return product
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().populate('createdBy');
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('createdBy');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { name, description, category, price } = updateProductDto
    const product = await this.productModel.findById(id)
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (name) product.name = name
    if (description) product.description = description
    if (category) product.category = category
    if (price) product.price = price
    return product.save()
  }

  async remove(id: string): Promise<{ message: string }> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productModel.deleteOne({ _id: id });
    return { message: 'Product successfully deleted' };
  }

  async validateOwnership(userId: string, productId: string): Promise<void> {
    const product = await this.productModel.findById(productId)
    if (!product) throw new NotFoundException('product not found')
    if (product.createdBy.toString() !== userId) throw new UnauthorizedException('unAuthorized')
  }
}
