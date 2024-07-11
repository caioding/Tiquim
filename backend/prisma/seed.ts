import { PrismaClient } from "@prisma/client"
import { UserType} from "../src/resources/userType/userType.constants"

const prisma = new PrismaClient();

const seed = async () => {
    await prisma.userType.createMany({ data: [
        { id: UserType.ADMIN, label: "admin"},
        { id: UserType.CLIENT, label: "client"}
    ]})
}

seed().then(async() => {
    await prisma.$disconnect();
})
.catch(async(err) => {
    console.log(err);
    await prisma.$disconnect();
})