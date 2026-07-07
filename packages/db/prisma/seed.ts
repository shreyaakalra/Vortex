import { prisma } from "@vortex/db";

async function main(){

    const shreya = await prisma.user.upsert({
        where: {number: '8700777249'},
        update: {},
        create: {
            number: '8700777249',
            password: "fjdkncjkrhbgrvf",
            name: "Shreya",
            email: "shreyaa.kalra@gmail.com",

            balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            }
        }
    })

    const vivek = await prisma.user.upsert({
        where: {number: "9717422883"},
        update: {},
        create: {
            name: "Vivek",
            number: "9717422883",
            email:  "vivek.klra@gmail.com",
            password: "hjdcbdkjcnkjfv",

            balance: {
                create: {
                    amount: 10000,
                    locked: 0
                }
            }
        }
    })

    const kavita = await prisma.user.upsert({
        where: {number: "9656561568"},
        update: {},
        create: {
            name: "Kavita",
            email: "kavita@gmail.com",
            password: "cjdksdncjnj",
            number: "9656561568",

            balance: {
                create: {
                    amount: 15000,
                    locked: 0
                }
            }
        }
    })

    const shaurya = await prisma.user.upsert({
        where: {number: "9999999999"},
        update: {},
        create: {
            name: "Shaurya",
            email: "shaurya@gmail.com",
            number: "9999999999",
            password: "djdncbhjbvhj",

            balance: {
                create: {
                    amount: 1000,
                    locked: 0
                }
                
            }
        }
    })
}

main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })

