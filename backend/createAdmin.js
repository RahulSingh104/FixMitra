require("dotenv").config()
const prisma = require("./src/prisma/client")
const bcrypt = require("bcryptjs")

async function createAdmin(name, email, password) {
  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    console.log("⚠️ Admin already exists:", email)
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      provider: "EMAIL",
      isVerified: true,
    },
  })

  console.log("✅ Admin created:", email)
}

async function main() {
  await createAdmin("Admin One", "rajrahul04062004@gmail.com", "admin123")
  await createAdmin("Admin Two", "admin2@gmail.com", "admin123")
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
