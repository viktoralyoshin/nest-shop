import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	getCategories() {
		return this.prisma.category.findMany()
	}

	getById(id: number) {
		return this.prisma.category.findUnique({
			where: {
				id
			}
		})
	}

	getByName(name: string) {
		return this.prisma.category.findUnique({
			where: {
				name
			}
		})
	}

	async create(dto: CategoryDto) {
		const oldCategory = await this.getByName(dto.name)

		if (oldCategory) throw new BadRequestException('Category is exists')

		return this.prisma.category.create({
			data: dto
		})
	}

    delete(id: number){
        return this.prisma.category.delete({
            where: {
                id
            }
        })
    }
}
