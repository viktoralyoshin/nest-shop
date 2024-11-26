import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getCategories() {
		return this.categoryService.getCategories()
	}

  @Get('/:id')
  async getCategory(@Param('id') id: string){
    return this.categoryService.getById(parseInt(id))
  }

  @UsePipes(new ValidationPipe())
	@HttpCode(200)	
  @Post()
	async createCategory(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

  @HttpCode(200)
  @Post('/:id')
  async deleteCategory(@Param('id') id: string){
    return this.categoryService.delete(parseInt(id))
  }

}
