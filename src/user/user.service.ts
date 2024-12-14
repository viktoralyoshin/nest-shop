import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				orders: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						products: {
							include: {
								category: true
							}
						}
					}
				}
			}
		})
	}

	getAll() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				phoneNumber: true,
				firstName: true,
				lastName: true,
				createdAt: true
			}
		})
	}

	getByPhoneNumber(phoneNumber: string) {
		return this.prisma.user.findUnique({
			where: {
				phoneNumber
			}
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		const totalOrders = profile.orders.length

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = profile

		return {
			user: user,
			statistics: [
				{
					label: 'Заказы',
					value: totalOrders
				}
			]
		}
	}

	async create(dto: RegisterDto) {
		const user = {
			phoneNumber: dto.phoneNumber,
			firstName: dto.firstName,
			lastName: dto.lastName,
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}
}
