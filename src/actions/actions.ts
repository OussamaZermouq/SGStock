"use server";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

export async function ajouterClientSociete(data: z.infer<any>) {
  try {
    const newClient = await prisma.client.create({
      data: {
        nom: data.nom,
        telephone: data.telephone,
        adresse: data.adresse,
        email: data.email,
        ICE: data.ICE,
        webSite: data.webSite,
        type: "Societe",
      },
    });
    return { success: true, client: newClient };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
      return { success: false, error: "Les champs doivent etre unique" };
      }
      else if (e.code === "P2000") {
        return { success: false, error: "Un des champs est trop long" };
      }
        
    }
    throw e;
  }

}
export async function ajouterClientCommune(data:z.infer<any>){
  try {
    const newClient = await prisma.client.create({
      data: {
        nom: data.communeNom,
        telephone: data.communeTel,
        adresse: data.communeAdr,
        email: data.communeEmail,
        city: data.communeCity,
        type: "Commune",
      },
    });
    return { success: true, client: newClient };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
      return { success: false, error: "Les champs doivent etre unique (Email, Tel, nom)" };
      }
      else if (e.code === "P2000") {
        return { success: false, error: "Un des champs est trop long" };
      }
        
    }
    throw e;
  }
}
