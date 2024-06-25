import { PrismaClient } from "@prisma/client"
import { UserType} from "../src/resources/userType/userType.constants"

const prisma = new PrismaClient();

const seed = async () => {
    await prisma.tipoUsuario.createMany({ data: [
        { id: UserType.ADMIN, rotulo: "admin"},
        { id: UserType.CLIENT, rotulo: "client"}
    ]})
}

seed().then(async() => {
    await prisma.$disconnect();
})
.catch(async(err) => {
    console.log(err);
    await prisma.$disconnect();
})