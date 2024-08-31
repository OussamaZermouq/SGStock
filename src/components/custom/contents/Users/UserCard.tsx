"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@prisma/client";
import { EllipsisVertical, Pen, Trash, User as UserIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";

export default function UserCard(userData: User) {
  const userInfo = userData.userData;
  const router = useRouter();
  const { toast } = useToast();
  async function onDeleteClick() {
    try {
      const response = await deleteUser(userInfo.id);
      if (response.success) {
        window.location.reload()
        toast({
          title: "Sucess",
          description: "L'utilisateur a été supprimé avec succès",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue",
      });
    }
  }
  return (
    <Card className="p-5 shadow-lg">
      <div className="flex flex-row items-center gap-5">
        {userInfo.image ? (
          <CldImage
            className="rounded-2xl"
            src={userInfo.image}
            width="80"
            height="80"
            sizes="100vw"
            alt="User Image"
            aspectRatio={1}
          />
        ) : (
          <UserIcon size={80} />
        )}
        <div>
          <CardHeader>
            <CardDescription className="text-lg text-pretty">
              {userInfo.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-md text-pretty">
            {userInfo.email}
          </CardContent>
          <CardFooter>
            <Badge className="place-self-center">{userInfo.role}</Badge>
          </CardFooter>
        </div>
        <div className="self-center justify-self-end">
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`Users/Modifieruser/${userInfo.id}`);
                  }}
                  className="flex flex-row gap-2"
                >
                  <Pen size={20} /> Modifier
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                  <AlertDialogTrigger>
                    <div className="text-red-500 flex flex-row gap-2">
                      <Trash size={20} /> Supprimer
                    </div>
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Etes vous sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-red-500">
                  Voullez vous vraiment supprimer cet utlisateur{" "}
                  <p className="font-extrabold indent-5 mx-5 text-lg">
                    {userInfo.name}
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    className="bg-red-500 text-white"
                    variant={"destructive"}
                    onClick={() => {
                      onDeleteClick();
                    }}
                  >
                    Confirmer
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
