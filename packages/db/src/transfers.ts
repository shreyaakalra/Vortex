import type { Balance } from "./generated/prisma/client.js";import { prisma } from "./index";

export default async function transferMoney(fromUserID: number, toUserID: number, amount: number){
    try{
        const result = await prisma.$transaction(async(tx) => {

            if(amount<0) throw new Error("You can't send negative amount.")

            if(amount===0) throw new Error("You can't send zero as an amount.")

            if(fromUserID === toUserID) throw new Error("You can't sed money to yourself.")

            let balancesA, balancesB;

            if(fromUserID<toUserID){

                balancesA = await tx.$queryRaw<Balance[]>`
                    SELECT * FROM "Balance"
                    WHERE "userId"=${fromUserID}
                    FOR UPDATE
                `
                balancesB = await tx.$queryRaw<Balance[]>`
                    SELECT * FROM "Balance"
                    WHERE "userId"=${toUserID}
                    FOR UPDATE
                `
            }
            else{

                balancesB = await tx.$queryRaw<Balance[]>`
                    SELECT * FROM "Balance"
                    WHERE "userId"=${toUserID}
                    FOR UPDATE
                `
                balancesA = await tx.$queryRaw<Balance[]>`
                    SELECT * FROM "Balance"
                    WHERE "userId"=${fromUserID}
                    FOR UPDATE
                `

            }

            const balanceA = balancesA[0];
            if(!balanceA) throw new Error("Sender not found!")
            
            const balanceB = balancesB[0];
            if(!balanceB) throw new Error("Receiver not found")

            const senderMoney = balanceA.amount;
            const receiverMoney = balanceB.amount;

            const newSenderMoney = senderMoney - amount;

            if(newSenderMoney<0) throw new Error("You have insufficient balance. Add more funds.")

            const newReceiverMoney = receiverMoney + amount;

            await tx.balance.update({
                where: {
                    userId: fromUserID
                },
                data: {
                    amount: newSenderMoney
                }
            });

            await tx.balance.update({
                where: {
                    userId: toUserID
                },
                data: {
                    amount: newReceiverMoney
                }
            })

            const ledgerEntry =  await tx.ledger.create({
                data: {
                    type: "P2P",
                    amount: amount,
                    status: "SUCCESS",
                    fromUserId: fromUserID,
                    toUserId: toUserID
                },
            })

            return ledgerEntry;

        }, {
            maxWait: 15000,
            timeout: 15000,
        }
    )

        return {success: true, ledgerEntry: result};

    } catch(e: any){
        return {success: false, message: e.message || "an error has occurred."}
    }
}

