import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BucketService } from '../bucket/bucket.service';

@Injectable()
export class WishlistService {
	constructor(private prisma: PrismaService, private bucketService: BucketService) {}

	getByUserId(userId: string) {
		return this.prisma.wishlist.findUnique({
			where: {
				userId
			},
			include: {
				products: {
					include: {
						category: true
					}
				}
			}
		})
	}

	async create(userId: string) {
		return this.prisma.wishlist.create({
			data: {
				userId
			}
		})
	}

	async addProduct(productId: number, userId: string) {
		return this.prisma.wishlist.update({
			where: {
				userId
			},
			data: {
				products: {
					connect: {
						id: productId
					}
				}
			}
		})
	}

	async deleteProduct(productId: number, userId: string) {
		return this.prisma.wishlist.update({
			where: {
				userId
			},
			data: {
				products: {
					disconnect: {
						id: productId
					}
				}
			}
		})
	}

    async addProductToBucket(productId: number, userId: string){
        await this.bucketService.addProduct(productId, userId)

        return this.prisma.wishlist.update({
            where: {
               userId 
            },
            data: {
                products: {
                    disconnect: {
                        id: productId
                    }
                }
            }
        })
    }
}
