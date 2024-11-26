import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class BucketService {
	constructor(private prisma: PrismaService) {}

	getByUserId(userId: string) {
		return this.prisma.bucket.findUnique({
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
        return this.prisma.bucket.create({
            data: {
                userId
            }
        })
    }

    async addProduct(productId: number, userId: string ) {
        return this.prisma.bucket.update({
            where: {
                userId
            }, 
            data: {
                products: {
                    connect: {
                        id: productId
                    }
                }
            }, 
        })
    }

    async deleteProduct(productId: number, userId: string) {
        return this.prisma.bucket.update({
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
