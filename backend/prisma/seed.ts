import { PrismaClient } from "@prisma/client"
import { UserType } from "../src/resources/userType/userType.constants"
import { PaymentMethodType } from "../src/resources/paymentMethodType/paymentMethodType.constants"
const prisma = new PrismaClient();

const seed = async () => {
    await prisma.paymentMethodType.createMany({
        data: [
            { id: PaymentMethodType.CREDIT, label: "credit" },
            { id: PaymentMethodType.PIX, label: "pix" }
        ]
    })

    await prisma.userType.createMany({
        data: [
            { id: UserType.ADMIN, label: "admin" },
            { id: UserType.CLIENT, label: "client" }
        ]
    })
}

seed().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (err) => {
        console.log(err);
        await prisma.$disconnect();
    })