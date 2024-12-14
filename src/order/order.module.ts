import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { BucketModule } from 'src/bucket/bucket.module'
import { PrismaService } from 'src/prisma.service'

@Module({
	imports: [BucketModule],
	controllers: [OrderController],
	providers: [OrderService, PrismaService]
})
export class OrderModule {}
