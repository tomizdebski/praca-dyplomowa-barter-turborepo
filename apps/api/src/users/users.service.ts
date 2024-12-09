import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // Funkcja do pobrania wszystkich użytkowników
  async findAll() {
    return this.prismaService.users.findMany();
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
