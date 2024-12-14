import { Injectable } from '@nestjs/common'
import { BucketService } from '../bucket/bucket.service'
import { PrismaService } from '../prisma.service'

@Injectable()
export class OrderService {
	constructor(
		private bucketService: BucketService,
		private prisma: PrismaService
	) {}

	getOrders(userId: string) {
		return this.prisma.order.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: "desc"
			}
		})
	}

	getOrder(id: string) {
		return this.prisma.order.findUnique({
			where: {
				id
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

	async createOrder(userId: string) {
		//eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { products, ...data } = await this.bucketService.getByUserId(userId)

		const productIds = []
		let price = 0

		for (let i = 0; i < products.length; i++) {
			productIds.push({ id: products[i].id })
			price += products[i].price
		}

		await this.bucketService.cleanBucket(userId)

		const order = this.prisma.order.create({
			data: {
				userId,
				price,
				products: {
					connect: productIds
				}
			}
		})

		return order
	}
}
