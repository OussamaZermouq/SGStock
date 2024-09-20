import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { PrismaClient } from '@prisma/client';

export function CardClientCount() {

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row">
          <PersonSharpIcon className=".MuiIcon-fontSizeLarge row-span-3" />
          <div className="mx-10">
            <CardTitle className="">Client</CardTitle>
            <div className=" text-4xl">10</div>
          </div>
        </div>
        <Separator />
        <CardFooter className="text-xs text-zinc-500">
          Le nombre de tous les Clients dans notre systeme
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
