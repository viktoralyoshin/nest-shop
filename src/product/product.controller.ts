import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(){
    return this.productService.getProducts()
  }

  @Get("/:id")
  async getProduct(@Param('id') id:string){
    return this.productService.getById(parseInt(id))
  }

  @Get('category/:id')
  async getProductsByCategory(@Param('id') id: string){
    return this.productService.getByCategories(parseInt(id))
  }

  @HttpCode(200)
  @Post()
  async create(@Body() dto: ProductDto){
    return this.productService.create(dto)
  }

  @HttpCode(200)
  @Post('/:id')
  async delete(@Param('id') id: string){
    return this.productService.delete(parseInt(id))
  }
}
