import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { WishlistService } from './wishlist.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('wishlist')
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) {}

	@Get()
	@Auth()
	async getBucketByUserId(@CurrentUser('id') id: string) {
		return this.wishlistService.getByUserId(id)
	}

	@HttpCode(200)
	@Post('/add/:id')
	@Auth()
	async addProduct(
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		return this.wishlistService.addProduct(parseInt(productId), userId)
	}

	@HttpCode(200)
	@Post('/delete/:id')
	@Auth()
	async deleteProduct(
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		return this.wishlistService.deleteProduct(parseInt(productId), userId)
	}

	@HttpCode(200)
	@Post('/add-to-bucket/:id')
	@Auth()
	async addProductToBucket(
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		return this.wishlistService.addProductToBucket(parseInt(productId), userId)
	}
}
