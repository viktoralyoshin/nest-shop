import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { BucketService } from './bucket.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('bucket')
export class BucketController {
	constructor(private readonly bucketService: BucketService) {}

	@Get()
	@Auth()
	async getBucketByUserId(@CurrentUser('id') id: string) {
		return this.bucketService.getByUserId(id)
	}

	@HttpCode(200)
	@Post('/add/:id')
	@Auth()
	async addProduct(
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		return this.bucketService.addProduct(parseInt(productId), userId)
	}

	@HttpCode(200)
	@Post('/delete/:id')
	@Auth()
	async deleteProduct(
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		return this.bucketService.deleteProduct(parseInt(productId), userId)
	}
}
