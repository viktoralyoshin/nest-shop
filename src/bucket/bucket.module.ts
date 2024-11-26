import { Module } from '@nestjs/common'
import { BucketService } from './bucket.service'
import { BucketController } from './bucket.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [BucketController],
	providers: [BucketService, PrismaService],
	exports: [BucketService]
})
export class BucketModule {}
