import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductDto } from './dto/product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getProducts() {
		return this.productService.getProducts()
	}

	@Get('/:id')
	async getProduct(@Param('id') id: string) {
		return this.productService.getById(parseInt(id))
	}

	@Get('category/:id')
	async getProductsByCategory(@Param('id') id: string) {
		return this.productService.getByCategories(parseInt(id))
	}

	@HttpCode(200)
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@Auth()
	async create(
		@Body() dto: ProductDto,
		@UploadedFile() file: Express.Multer.File
	) {
		return this.productService.create(dto, file)
	}

	@HttpCode(200)
	@Post('/:id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.productService.delete(parseInt(id))
	}
}
