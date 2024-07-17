// pages/api/addClient.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { nom, telephone, adresse, email, ICE, webSite, type } = req.body;
    
    try {
      const newClient = await prisma.client.create({
        data: {
          nom,
          telephone,
          adresse,
          email,
          ICE,
          webSite,
          type,
        },
      });
      res.status(200).json(newClient);
    } catch (error) {
      res.status(500).json({ error: "Error creating client" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
