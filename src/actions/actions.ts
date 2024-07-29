"use server";
import { Prisma, Client } from "@prisma/client";
import prisma from "@/lib/db";
import { z } from "zod";

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

export async function getClients(): Promise<Client[]> {
  try {
    const clients = await prisma.client.findMany();
    return clients;
  } catch (e) {
    throw "erreur lors de la récupération des clients";
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
    return { success: false, error: "une erreur est survenue" };
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
    return { success: false, error: "une erreur est survenue" };
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

//categories

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (e) {
    return { success: false, error: "Une erreur est survenue" };
  }
}

export async function ajouterCategorie(data: z.infer<any>) {
  try {
    const categorie = await prisma.category.create({
      data: {
        nom: data.categorieNom,
        description: data.categorieDescription,
      },
    });
    return {
      success: true,
      categorie,
    };
  } catch (e) {
    return {
      success: false,
      error: "Une erreur est survenue",
    };
  }
}

export async function modifierCategorie(id: number, values: any) {
  try {
    const categorie = await prisma.category.update({
      where: { id },
      data: {
        nom: values.categorieNom,
        description: values.categorieDescription,
      },
    });
    return {
      success: true,
      categorie,
    };
  } catch (e) {
    return {
      success: false,
      error: "Une erreur est survenue",
    };
  }
}

export async function deleteCategorie(id: number) {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      error: "Une erreur est survenue",
    };
  }
}

//fournisseur

export async function getFrounisseurs() {
  try {
    const fournisseurs = await prisma.fournisseur.findMany();
    return fournisseurs;
  } catch (e) {
    throw e;
  }
}

export async function getFrounisseursById(id:number){
  try{
    const fournisseur = await prisma.fournisseur.findUnique({
      where:{
        id:id,
      }
    })
    return fournisseur;
  }
  catch(e){
    throw e;
  }
}

export async function ajouterFournisseur(fournisseurData: z.infer<any>) {
  try {
    await prisma.fournisseur.create({
      data: fournisseurData,
    });
    return {
      success: true,
    };
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

export async function deleteFournisseur(id: number) {
  try {
    await prisma.fournisseur.delete({
      where: {
        id: id,
      },
      C,
    });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function modifierFournisseur(id: number, values: any) {
  try {
    const categorie = await prisma.fournisseur.update({
      where: { id },
      data: {
        nom: values.fournisseurNom,
        telephone: values.fournisseurTel,
        adresse: values.fournisseurAdr,
        email: values.fournisseurEmail,
      },
    });
    return {
      success: true,
      categorie,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "Une erreur est survenue",
    };
  }
}

//M Premieres

export async function getMatieres() {
  try {
    const matieres = await prisma.matierePremiere.findMany({
      include:{
        fournisseurs:true,
      }
    });
    console.log(matieres)
    return matieres;
  } catch (e) {
    throw e;
  }
}

export async function ajouterMatiere(values: any, fournisseurid:any) {
  try {
    await prisma.matierePremiere.create({
      data: {
        nom: values.nom,
        unite:values.unite,
        FournisseurMatierePremiere:{
          create:[
            {
              quantitee: values.quantitee,
              fournisseur:{
                connect : {id :Number(fournisseurid)}
              }
            }
          ]
        }
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error:"erreur lors lajout"
    };
  }
}
