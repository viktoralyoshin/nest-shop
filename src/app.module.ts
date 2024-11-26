import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { BucketModule } from './bucket/bucket.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, ProductModule, CategoryModule, BucketModule, WishlistModule],
})
export class AppModule {}
