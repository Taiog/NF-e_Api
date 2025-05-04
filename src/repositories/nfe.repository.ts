import prisma from "../prisma/client";
import { NFeDB } from "../types/nfe";
import { NFe } from '@prisma/client';

export async function saveNFe(data: NFeDB): Promise<NFe> {
    return prisma.nFe.create({ data });
  }