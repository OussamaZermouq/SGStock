import { getProduits } from "@/actions/actions";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Produit } from "@prisma/client";
import { LayoutGrid, MoveUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProduitCardDashBoard() {
    
  const router = useRouter();
  const [produitsList, setProduitlist] = useState<Produit[]>();
  useEffect(() => {
    async function fetchData() {
      const produitData = await getProduits();
      setProduitlist(produitData);
    }
    fetchData();
  }, []);
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle>Produits</CardTitle>
        <CardDescription className="text-muted-foreground">
          Liste Produits recemment ajoutees
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto my-1">
        {produitsList &&
          produitsList.map((p) => {
            return (
              <div className="grid grid-cols-10 gap-5" key={p.id}>
                <div>
                  {p.imageProduit ? (
                    <CldImage
                      className="rounded-xl"
                      src={p.imageProduit?.toString()}
                      width={50}
                      height={50}
                      alt="image produit"
                    />
                  ) : (
                    <LayoutGrid size={50} />
                  )}
                </div>
                <div className="col-span-2 self-center">
                  <p className="text-muted-foreground">{p.codeProduit}</p>
                </div>

                <div className="self-center">
                  <p>{p.nomProduit}</p>
                </div>
                <div className="col-start-9 self-center">
                  <p>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "MAD",
                    }).format(parseFloat(p.prixProduit))}
                  </p>
                </div>
              </div>
            );
          })}
      </CardContent>
      <Separator />
      <CardFooter className="my-2">
        <Button variant={'ghost'}
        onClick={()=>router.push('/Produits')}
        >
          Consulter vos Produits <MoveUpRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
