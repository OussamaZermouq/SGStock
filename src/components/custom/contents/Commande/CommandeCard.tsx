import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function CommandeCard(props:{type:string, commandeCount:Number, color:string}) {
  return (
    <Card className={cn("w-[350px] shadow-xl p-5 bg-gradient-to-b", props.color)}>
      <CardHeader>
        <CardTitle>Commandes</CardTitle>
        <CardDescription className="text-muted-foreground">Nombre de commande en {props.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-4 gap-4 w-full justify-items-end">
            <div className="col-start-4 font-bold text-2xl self-end">
                {props.commandeCount.toString()}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
