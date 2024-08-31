"use client";
import React, { useEffect, useState } from "react";
import { CardDashboard } from "../CardDashboard";
import { ProduitCategorieChart } from "../Charts/ProduitCategorieChart";
import {
  getClientCount,
  getCommandeCount,
  getProduitCount,
} from "@/actions/actions";
import ProduitCardDashBoard from "./ProduitCardDashBoard";
import { SkeletonCard } from "./SkeletonCard";

export default function Dashboard() {
  const [clientCount, setClientCount] = useState<number>(0);
  const [produitCount, setProduitCount] = useState<number>(0);
  const [commandeCount, setCommandeCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      const clientCount = await getClientCount();
      const produitCount = await getProduitCount();
      const commandeCount = await getCommandeCount();
      setClientCount(clientCount);
      setProduitCount(produitCount);
      setCommandeCount(commandeCount);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          <SkeletonCard />

          <SkeletonCard />

          <SkeletonCard />

          <SkeletonCard />

          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <CardDashboard item="Produits" count={produitCount} />
          </div>
          <div>
            <CardDashboard item="Clients" count={clientCount} />
          </div>
          <div>
            <CardDashboard item="Commandes" count={commandeCount} />
          </div>
          <div>
            <ProduitCategorieChart />
          </div>
          <div className="col-span-2">
            <ProduitCardDashBoard />
          </div>
        </div>
      )}
    </div>
  );
}
