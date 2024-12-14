import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { OrderService } from './order.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@Auth()
	async getOrderByUserId(@CurrentUser('id') userId: string) {
		return this.orderService.getOrders(userId)
	}

  @Get('/:id')
  @Auth()
  async getOrder(@Param('id') id: string){
      return this.orderService.getOrder(id)
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async createOrder(@CurrentUser('id') userId: string){
    return this.orderService.createOrder(userId)
  }
}
