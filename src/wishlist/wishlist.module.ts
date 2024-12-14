import { Module } from '@nestjs/common'
import { WishlistService } from './wishlist.service'
import { WishlistController } from './wishlist.controller'
import { PrismaService } from 'src/prisma.service'
import { BucketModule } from 'src/bucket/bucket.module'

@Module({
	imports: [BucketModule],
	controllers: [WishlistController],
	providers: [WishlistService, PrismaService],
	exports: [WishlistService]
})
export class WishlistModule {}
