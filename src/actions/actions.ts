"use server";
import { Prisma, Client, commandeStatus } from "@prisma/client";
import prisma from "@/lib/db";
import { z } from "zod";
import { connect } from "http2";
import { DataTable } from "@/components/custom/contents/common/DataTable";

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

export async function getFrounisseurs(maitereId?: number) {
  try {
    if (maitereId) {
      const fournisseurIds = await prisma.fournisseurMatierePremiere.findMany({
        where: {
          matierePremiereId: maitereId,
        },
        select: {
          fournisseurId: true,
        },
      });

      // Extract the ids into an array
      const ids = fournisseurIds.map((fmp) => fmp.fournisseurId);

      // Step 2: Get the list of Fournisseurs whose id is not in the list of ids
      const fournisseursNotIn = await prisma.fournisseur.findMany({
        where: {
          id: {
            notIn: ids,
          },
        },
      });
      return fournisseursNotIn;
    }
    const fournisseurs = await prisma.fournisseur.findMany();
    return fournisseurs;
  } catch (e) {
    throw e;
  }
}

export async function getFrounisseursById(id: number) {
  try {
    const fournisseur = await prisma.fournisseur.findUnique({
      where: {
        id: id,
      },
    });
    return fournisseur?.nom;
  } catch (e) {
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
      include: {
        fournisseurs: true,
      },
    });
    return matieres;
  } catch (e) {
    throw e;
  }
}

export async function getMatieresDispo() {
  try {
    const matieresWithPositiveQuantities =
      await prisma.fournisseurMatierePremiere.groupBy({
        by: ["matierePremiereId"],
        _sum: {
          quantitee: true,
        },
        having: {
          quantitee: {
            _sum: {
              gt: 0,
            },
          },
        },
      });

    const matierePremiereIds = matieresWithPositiveQuantities.map(
      (m) => m.matierePremiereId
    );

    const matierePremieres = await prisma.matierePremiere.findMany({
      where: {
        id: {
          in: matierePremiereIds,
        },
      },
    });

    return matierePremieres;
  } catch (e) {
    throw e;
  }
}

export async function ajouterMatiere(values: any, fournisseurid: any) {
  try {
    await prisma.matierePremiere.create({
      data: {
        nom: values.nom,
        unite: values.unite,
        quantiteeMatiere: values.quantitee,
        fournisseurs: {
          create: [
            {
              quantitee: values.quantitee,
              fournisseur: {
                connect: { id: Number(fournisseurid) },
              },
            },
          ],
        },
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "Une erreur est survenue",
    };
  }
}

export async function deleteMatiere(matierePremiereId: number) {
  try {
    const deletedMatierePremiere = await prisma.matierePremiere.delete({
      where: {
        id: matierePremiereId,
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
    };
  }
}

export async function modifierMatiere(values: any, id: number) {
  console.log(values);
  try {
    await prisma.matierePremiere.update({
      where: {
        id: id,
      },
      data: {
        nom: values.nom,
        unite: values.unite,
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
    };
  }
}

export async function modifierQuantiteMatiereFour(
  values: any,
  fournisseurId: number,
  matierePremiereId: number
) {
  try {
    await prisma.fournisseurMatierePremiere.update({
      where: {
        fournisseurId_matierePremiereId: {
          fournisseurId: fournisseurId,
          matierePremiereId: matierePremiereId,
        },
      },
      data: {
        quantitee: values.quantitee,
      },
    });
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: e,
    };
  }
}

export async function ajouterFournisseurMaitere(
  values: any,
  matiereId: number
) {
  try {
    await prisma.fournisseurMatierePremiere.create({
      data: {
        fournisseur: {
          connect: {
            id: Number(values.fournisseurId),
          },
        },
        matierePremiere: {
          connect: {
            id: matiereId,
          },
        },
        quantitee: values.quantitee,
      },
    });
    const quantiteeInit = await prisma.matierePremiere.findUnique({
      where: {
        id: matiereId,
      },
      select: {
        quantiteeMatiere: true,
      },
    });
    // await prisma.matierePremiere.update({
    // where:{
    // id:matiereId
    // },
    // data:{
    // quantiteeMatiere : quantiteeInit + values.quantitee
    // }
    // })
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "erreur lors de l'ajout",
    };
  }
}

export async function deleteFournisseurMatiere(
  matierePremiereId: number,
  fournisseurId: number
) {
  try {
    const resp = await prisma.fournisseurMatierePremiere.delete({
      where: {
        fournisseurId_matierePremiereId: {
          fournisseurId,
          matierePremiereId,
        },
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Une erreur est survenue",
    };
  }
}

//Produit

export async function getProduits() {
  try {
    const produit = await prisma.produit.findMany({
      include: {
        categorieProduit: true,
        produitMatiere: true,
      },
    });
    return produit;
  } catch (error) {
    throw error;
  }
}
export async function checkMatiereStock(matiereId: number) {
  const stock = await prisma.fournisseurMatierePremiere.groupBy({
    by: ["matierePremiereId"],
    where: {
      matierePremiereId: matiereId,
    },
    _sum: {
      quantitee: true,
    },
  });

  return stock.length > 0 ? stock[0]._sum.quantitee : 0; // Assuming stock returns an array with summed quantity
}

export async function ajouterProduit(values: any, produitImage?: string) {
  // Check if the stock is available first for the matierePremiere
  const stockChecks = await Promise.all(
    values.matiereP.map(async (matiere: any) => {
      const stock = await checkMatiereStock(matiere.id);
      return {
        matiereId: matiere.id,
        hasStock: matiere.quantity <= stock,
      };
    })
  );

  // Check if any material does not have enough stock
  const outOfStock = stockChecks.find((stock) => !stock.hasStock);

  if (outOfStock) {
    return {
      success: false,
      message: `Stock non disponible pour l'article avec ID ${outOfStock.matiereId}`,
    };
  }

  // Proceed with creating the product if all materials have enough stock
  try {
    await prisma.produit.create({
      data: {
        codeProduit: values.codeProduit,
        nomProduit: values.nomProduit,
        noteProduit: values.noteProduit,
        prixProduit: values.prixProduit,
        quantiteProduit: values.quantiteeProduit,
        imageProduit: produitImage,
        categorieProduit: {
          connect: {
            id: Number(values.categorieId),
          },
        },
        produitMatiere: {
          create: values.matiereP.map((matiere: any) => ({
            Matiere: {
              connect: {
                id: Number(matiere.id),
              },
            },
            quantitee: matiere.quantity,
          })),
        },
      },
    });
    const quantiteeUpdate = await Promise.all(
      stockChecks.map(async (matiere: any) => {
        await prisma.matierePremiere.update({
          where: {
            id: matiere.matiereId,
          },
          data: {
            quantiteeMatiere: {
              decrement: values.matiereP.find(
                (value) => value.id === matiere.matiereId
              ).quantity,
            },
          },
        });
      })
    );
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Une Erreur est survenue",
    };
  }
}

export async function getProduitMatiere(id: any) {
  try {
    const matiereP = await prisma.produitMatiere.findMany({
      where: {
        produitId: id,
      },
    });
    return matiereP;
  } catch (error) {
    return {
      success: false,
      message: "Une Erreur est survenue",
    };
  }
}

export async function modifierProduit(values: any) {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Update the produit
      const updatedProduit = await prisma.produit.update({
        where: { id: values.produitId },
        data: {
          nomProduit: values.nomProduit,
          codeProduit: values.codeProduit,
          prixProduit: values.prixProduit,
          quantiteProduit: values.quantiteeProduit,
          noteProduit: values.noteProduit,
          imageProduit: values.imageUrl,
          categorieId: Number(values.categorieId),
        },
      });

      // Update the quantitee for each MatierePremiere
      for (const update of values.matiereP) {
        await prisma.produitMatiere.upsert({
          where: {
            matiereId_produitId: {
              matiereId: update.id,
              produitId: values.produitId,
            },
          },
          update: {
            quantitee: update.quantity,
          },
          create: {
            produitId: values.produitId,
            matiereId: update.id,
            quantitee: update.quantity,
          },
        });
      }

      return {
        success: true,
        message: "Produit modifié avec succès",
      };
    });
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "une erreur est survenue",
    };
  }
}

export async function deleteProduit(id: any) {
  //update the matierepremiere as well
  try {
    await prisma.produit.delete({
      where: {
        id: id,
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "erreur lors de la suppression",
    };
  }
}

//commande

export async function getCommandes(){
  try {
    const commandes = await prisma.commande.findMany({
      include:{
        produits:{
          include:{
            produit:true
          }
        },
        livraison:true,
      }
    })
    return commandes;
  } catch (error) {
    throw error
  }
}


export async function ajouterCommande(data: any) {
  console.log(data)
  try {
    return await prisma.$transaction(async (prisma) => {
      // Create the Commande
      const commande = await prisma.commande.create({
        data: {
          dateCommande: data.dateCommande,
          code: data.codeCommande,
          status: data.status,
          produits: {
            create: Object.keys(data.qteCommande).map((key) => ({
              produit: {
                connect: {
                  id: Number(key),
                },
              },
              quantite: data.qteCommande[key],
            })),
          },
          client: {
            connect: {
              id: Number(data.clientId),
            },
          },
        },
      });

      // Update Product Quantities
      await Promise.all(
        Object.keys(data.qteCommande).map((key) =>
          prisma.produit.update({
            where: {
              id: Number(key),
            },
            data: {
              quantiteProduit: {
                decrement: data.qteCommande[key],
              },
            },
          })
        )
      );

      // Create Livraison if provided
      if (data.dateLivraison && data.statusLivraison) {
        await prisma.livraison.create({
          data: {
            dateLivraison: data.dateLivraison,
            status: data.statusLivraison,
            commande: {
              connect: {
                id: commande.id,
              },
            },
          },
        });
      }

      return {
        success: true,
      };
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erreur lors de la création",
    };
  }
}
