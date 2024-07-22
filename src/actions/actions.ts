"use server";
import { PrismaClient, Prisma, Client } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

export async function getClientById(id: number): Promise<Client | null> {
  try {
    const client = await prisma.client.findUnique({ where: { id: id } });
    if (client) {
      return client;
    } else {
      return null;
    }
  } catch (e) {
    throw "ce client n'existe pas";
  }
}

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
      } else if (e.code === "P2000") {
        return { success: false, error: "Un des champs est trop long" };
      }
    }
    throw e;
  }
}
export async function ajouterClientCommune(data: z.infer<any>) {
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
        return {
          success: false,
          error: "Les champs doivent etre unique (Email, Tel, nom)",
        };
      } else if (e.code === "P2000") {
        return { success: false, error: "Un des champs est trop long" };
      }
    }
    throw e;
  }
}

export async function updateClientSociete(id: number, client: any) {
  try {
    const newClient = await prisma.client.update({
      where: { id: id },
      data: {
        nom: client.nom,
        telephone: client.telephone,
        adresse: client.adresse,
        email: client.email,
        ICE: client.ICE,
        webSite: client.webSite,
      },
    });
    return { success: true, client: newClient };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw e;
    }
    return { success: false, error:"une erreur est survenue" };
  }
}


export async function updateClientCommune(id: number, client: any) {
  try {
    const newClient = await prisma.client.update({
      where: { id: id },
      data: {
        nom: client.communeNom,
        telephone: client.communeTel,
        adresse: client.communeAdr,
        email: client.communeEmail,
        city: client.communeCity,
      },
    });
    return { success: true, client: newClient };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw e;
    }
    return { success: false, error:"une erreur est survenue" };
  }
}

export async function deleteClient(email: string) {
  try {
    const deleteClient = await prisma.client.delete({
      where: {
        email: email,
      },
    });
    return { success: true };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        error: "Une erreur est survenue lors de la suppression!",
      };
    }
    throw e;
  }
}
