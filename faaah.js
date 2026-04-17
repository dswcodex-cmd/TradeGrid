import prisma from "./prismaClient.js";

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to Neon database!");

    const companies = await prisma.company.findMany();
    console.log("Companies:", companies);

  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();