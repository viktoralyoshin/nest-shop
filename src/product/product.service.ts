import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	getProducts() {
		return this.prisma.product.findMany({
			include: {
				category: true
			}
		})
	}

	getByCategories(categoryId: number) {
		return this.prisma.product.findMany({
			where: {
				categoryId
			},
			include: {
				category: true
			}
		})
	}

	getById(id: number) {
		return this.prisma.product.findUnique({
			where: {
				id
			},
			include: {
				category: true
			}
		})
	}

	async create(dto: ProductDto, file: Express.Multer.File) {
		const product = {
			name: dto.name,
			description: dto.description,
			price: parseFloat(dto.price.toString()),
			categoryId: parseInt(dto.categoryId.toString()),
			pictureUrl: `http://localhost:5000/files/${file.filename}`
		}

		return this.prisma.product.create({
			data: product
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({
			where: {
				id
			}
		})
	}
}
