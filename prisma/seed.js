// Create a file named "userSeed.prisma"

const { PrismaClient, Gender } = require("@prisma/client");

const prisma = new PrismaClient();
async function main() {
  // Define an array of user data to seed
  const usersToSeed = [
    {
      email: "user1@example.com",
      name: "User 1",
    },
    {
      email: "user2@example.com",
      name: "User 2",
    },
    {
      email: "user3@example.com",
      name: "User 3",
    },
    // Add more user objects as needed
  ];

  // Use a loop to create and seed each user
  for (const userData of usersToSeed) {
    await prisma.user.create({
      data: userData,
    });
  }

  console.log("Seeded users successfully");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // Close the Prisma client to end the process
    await prisma.$disconnect();
  });
