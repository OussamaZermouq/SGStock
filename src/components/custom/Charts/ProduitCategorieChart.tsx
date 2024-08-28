"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getMatieresPremiereFiltered } from "@/actions/actions";

// Array of predefined colors
const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];

export function ProduitCategorieChart() {
  const [matierePStock, setMatierePStock] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      const matierepremiereData = await getMatieresPremiereFiltered();
      const getRandomColor = () => {
        return colorPalette[Math.floor(Math.random() * colorPalette.length)];
      };
      const formattedData = matierepremiereData?.map((item) => ({
        browser: item.nom, 
        visitors: item.quantiteeMatiere || 0,
        fill: getRandomColor(),
      }));

      setMatierePStock(formattedData);
    }

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col w-auto p-5">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock Matiere Premiere</CardTitle>
        <CardDescription className="text-muted-foreground">
          Donnees depuis Aout - 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={matierePStock} label dataKey="visitors" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Affichage du total des matieres premieres.
        </div>
      </CardFooter>
    </Card>
  );
}
