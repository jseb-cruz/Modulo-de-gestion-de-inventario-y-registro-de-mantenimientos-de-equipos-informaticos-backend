import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import { CreateUserDto } from '../../application/user/dto/create-user.dto';
import { UpdateUserDto } from '../../application/user/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  // Lista usuarios sin exponer contraseñas
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  // Obtiene un usuario por id
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  // Crea un usuario (registro público)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  // Actualiza datos o contraseña de un usuario
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  // Elimina un usuario por id
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
