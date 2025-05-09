import { NFe, Prisma } from "@prisma/client";
import prisma from "../prisma/client";

export async function saveNFe(data: Prisma.NFeCreateInput): Promise<NFe> {
  return prisma.nFe.create({ data });
}

export function getAllNFes() {
  return prisma.nFe.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getNFeById(id: string) {
  return prisma.nFe.findUnique({
    where: { id },
  });
}

export function deleteNFeById(id: string) {
  return prisma.nFe.delete({
    where: { id },
  });
}
