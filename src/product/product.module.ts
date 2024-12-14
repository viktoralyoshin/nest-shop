import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaService } from 'src/prisma.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Module({
	imports: [
		MulterModule.register({
			storage: diskStorage({
				destination: './files',
				filename: (req, file, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('')
					cb(null, `${randomName}${extname(file.originalname)}`)
				}
			})
		})
	],
	controllers: [ProductController],
	providers: [ProductService, PrismaService]
})
export class ProductModule {}
