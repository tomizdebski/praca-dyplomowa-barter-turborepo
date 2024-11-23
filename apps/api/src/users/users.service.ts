import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // Funkcja do rejestracji użytkownika
  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await hash(password, 10);
    
    return this.prismaService.users.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  // Funkcja do znalezienia użytkownika po emailu
  async findByEmail(email: string) {
    return this.prismaService.users.findUnique({
      where: { email },
    });
  }

  // Funkcja do pobrania użytkownika po ID
  async findById(id: number) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }
}

