/* eslint-disable @typescript-eslint/no-misused-promises */
import prisma from './index'

async function main (): Promise<any> {
  return await prisma.user.create({
    data: {
      username: 'admin',
      password: '$2b$10$q6s9WsTt02CSi4SIxrpiqu5FaSTSvFY6T9B8i/xmlzpcIGblWGNsu', // SenhaAdmin123
      account: {
        create: {
          balance: 100000
        }
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
