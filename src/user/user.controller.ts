import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  @Auth()
  async profile(@CurrentUser('id') id: string){
    return this.userService.getProfile(id)
  }

  @Get()
  @Auth()
  async getUsers(){
    return this.userService.getAll()
  }

  @Get('/:id')
  @Auth()
  async getUserById(@Param('id') id: string){
    return this.userService.getById(id)
  }

}
