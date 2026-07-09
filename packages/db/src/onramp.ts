import type { Balance } from "@prisma/client";
import { prisma } from "./index.js";

export default async function onRampTransfer(token: string, amount: number, status: string){

    try{

        const result = await prisma.$transaction(async(tx) => {

            if(amount===0) throw new Error("You can't receive 0 money.");
            if(amount<0) throw new Error("You can't receive negative money");
            if(!token) throw new Error("An error occured from the bank's side. Please try again. ")

            const ort = await tx.onRampTransaction.findUnique({
                where: {
                    token: token
                }
            });

            if (!ort) throw new Error("No matching on-ramp transaction found for this token")

            if (ort.status === "Success") {
                return { alreadyProcessed: true };
            }

            if (status === "Failure" && ort.status === "Pending") {

                await tx.onRampTransaction.update({
                    where: { id: ort.id },
                    data: { status: "Failure" },
                });

                await tx.ledger.create({
                    data: {
                        type: "ONRAMP",
                        amount: amount,
                        status: "FAILED",
                        toUserId: ort.userId,
                    },
                });

                return { markedAsFailed: true };
            }

            const userID = ort?.userId;

            if(!userID) throw new Error("user not found.");

            const balancesUser = await tx.$queryRaw<Balance[]>`
                SELECT * FROM "Balance"
                WHERE "userId" = ${userID}
                FOR UPDATE
            `
            const userBalance = balancesUser[0];
            if(!userBalance) throw new Error("user balance not found.");

            const newBalance = userBalance.amount + amount;

            await tx.balance.update({
                where: {
                    userId: userID
                },
                data: {
                    amount: newBalance
                }
            });

            await tx.onRampTransaction.update({
                where: {
                    id: ort.id
                },
                data: {
                    status: "Success"
                }
            });

            const ledgerEntry = await tx.ledger.create({
                data: {
                    type: "ONRAMP",
                    amount: amount,
                    status: "SUCCESS",
                    toUserId: userID
                }
            });

            return ledgerEntry;
        });

        if (result && "alreadyProcessed" in result) {
            return { success: true, message: "Already processed." };
        }

        if(result && "markedAsFailed" in result){
            return{ success: false, message: "Transaction Failed."}
        }

        return { success: true, ledgerEntry: result };

    }catch(e: any){
        return {success: false, message: e.message || "an error has occured"}
    }

}