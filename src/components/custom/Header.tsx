"use client";
import * as React from "react";
import { Button } from "../ui/button";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { ModeToggle } from "../ModeToggle";
import { auth } from "../../../auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Power, UserRound, UsersRound } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <div className="col-start-1 flex items-center justify-self-end ">
        <Image
          src={"/cropped-steelaform-LOGO.png"}
          width={60}
          height={60}
          alt="SteelaForm"
        />
      </div>
      <div className="col-start-11 flex items-center justify-self-end">
        <Button variant="outline" size="icon" asChild>
          <ModeToggle />
        </Button>
      </div>

      <div className="col-start-12 flex items-center justify-self-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <div>
                  <p>Mon Compte</p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    {session.data?.user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-row gap-2 items-center">
                <div>
                  <UserRound size={17} />
                </div>
                <div>Profil</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/Users");
              }}
            >
              <div className="flex flex-row gap-2 items-center">
                <div>
                  <UsersRound size={17} />
                </div>
                <div>Utilisateurs</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-row gap-2 items-center text-red-500">
                <div>
                  <Power size={17} />
                </div>
                <div>Se Deconnecter</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
