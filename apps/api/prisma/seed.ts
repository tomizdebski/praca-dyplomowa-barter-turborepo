import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// Funkcja seedująca
async function main() {
  // Tworzenie kategorii
  const categories = [
    'Python',
    'Linux',
    'JS',
    'Sieci',
    'HTML',
    'Git',
    'DevOps',
    'DB',
    'Css',
    'Cloud',
    'Agile',
    'Testowanie',
    'Regex',
    'Bezpieczeństwo',
    'Sql'
  ];

  for (const categoryName of categories) {
    await prisma.categories.create({
      data: {
        name: categoryName,
      },
    });
  }

  // Tworzenie 10 użytkowników
  for (let i = 0; i < 10; i++) {
    await prisma.users.create({
      data: {
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        password: `password${i}`,
        email: `user${i}@example.com`,
        role: Role.USER,
        createdAt: new Date(),
      },
    });
  }

  // Tworzenie 10 lokalizacji
  for (let i = 0; i < 10; i++) {
    await prisma.localizations.create({
      data: {
        city: `City${i}`,
        street: `Street${i}`,
        zip: `12345`,
        province: `Province${i}`,
      },
    });
  }

  // Tworzenie 10 lekcji
  for (let i = 0; i < 10; i++) {
    const instructor = await prisma.users.findFirst({
      where: { role: Role.ADMIN }, // Załóżmy, że administratorzy to instruktorzy
    });

    const category = await prisma.categories.findFirst();

    await prisma.lessons.create({
      data: {
        name: `Lesson${i}`,
        content: `Content for lesson ${i}`,
        instructorId: instructor.id,
        categoryId: category.id,
        createdAt: new Date(),
      },
    });
  }

  // Tworzenie 10 umiejętności
  for (let i = 0; i < 10; i++) {
    await prisma.skills.create({
      data: {
        name: `Skill${i}`,
        level: i + 1,
      },
    });
  }

  console.log('Seeding complete!');
}

// Uruchomienie funkcji głównej
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
