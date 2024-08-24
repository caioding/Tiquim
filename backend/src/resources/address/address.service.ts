import { PrismaClient } from "@prisma/client";
import { AddressDto, CreateAddressDto } from "./address.types";


const prisma = new PrismaClient()

/**
 * 
 * 
 * model Address {
  id        String   @id @default(uuid()) @db.Char(36)
  number    String   @db.VarChar(5)
  cep       String   @db.Char(8)
  city      String   @db.VarChar(100)
  uf        String   @db.Char(2)
  userId    String   @map("user_id") @db.Char(36)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  user      User     @relation(fields: [userId], references: [id])

  @@index([userId], map: "addresses_user_id_fkey")
  @@map("addresses")
}
 */


export const createAddress = async (address: CreateAddressDto, uid: string,): Promise<AddressDto> => {
    try {
        return await prisma.address.create({
            select: {
              id: true,
              number: true,
              cep: true,
              city: true,
              uf: true,
              userId: true,
              createdAt: true,
              updatedAt: true,
            },
            data: {
              ...address,
              userId: uid,
            },
          });   
    }
    catch(err) {
        console.log("erro no service: ",err)
        throw err;
    }
};
  
export const listAddress = async (
    uid: string,
    skip?: number,
    take?: number,
): Promise<AddressDto[] | null> => {
  return await prisma.address.findMany({
    select: {
        id: true,
        number: true,
        cep: true,
        city: true,
        uf: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
    },
    where:{userId:uid},
    skip,
    take,
    });
}

export const readUserAddress = async (
    uid: string,
    ): Promise<AddressDto[] | null> => {
    return await prisma.address.findMany({
        select: {
            id: true,
            number: true,
            cep: true,
            city: true,
            uf: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {userId: uid}
    });
}
  
  

export const deleteUserAddress = async (
    id: string, 
    uid: string): Promise<AddressDto> => {
    return await prisma.address.delete({ 
        where: { id: id, userId: uid } 
    });
  };
  