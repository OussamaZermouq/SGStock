import React, { ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HideImageIcon from "@mui/icons-material/HideImage";
import { Checkbox } from "@/components/ui/checkbox";
import { CldImage } from "next-cloudinary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

interface Produit {
  id: number;
  nomProduit: string;
  quantiteProduit: number;
  prixProduit: number;
  imageProduit?: string;
  isSelected?: boolean;
}

interface ProduitCardProps {
  produit: Produit;
  onCheckBoxChange: (produit: Produit, isSelected: boolean) => void;
}

const ProduitCard: React.FC<ProduitCardProps> = ({ produit, onCheckBoxChange }) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCheckBoxChange(produit, event);
  };

  return (
    <Card className="w-96 mb-5 shadow-lg">
      <CardContent className="grid grid-cols-5 gap-1 justify-items-center items-center w-96">
        <div>
          {produit.imageProduit ? (
            <CldImage
              className="rounded-xl"
              width="600"
              height="600"
              src={produit.imageProduit}
              sizes="100vw"
              alt="Description of my image"
            />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HideImageIcon className="w-[70px] h-[70px]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Aucune photo pour ce produit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div>
          <h5>{produit.nomProduit}</h5>
        </div>
        <div>
          <h5>{produit.quantiteProduit}</h5>
        </div>
        <div>
          <h5>{produit.prixProduit}</h5> MAD
        </div>
        <Checkbox
          onCheckedChange={handleCheckboxChange}
          checked={produit.isSelected || false}
        />
      </CardContent>
    </Card>
  );
};

export default ProduitCard;
