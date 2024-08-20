import * as React from "react";
import { Button } from "../ui/button";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { ModeToggle } from "../ModeToggle";
import { auth } from "../../../auth";

export default async function Header() {
  const session = await auth();
  return (
    <>
    <div className="col-start-10">
      {session && session.user?.email}
    </div>
      <div className="col-start-11 flex content-end justify-end">
        <Button variant="outline" size="icon" asChild>
          <ModeToggle/>
        </Button>
      </div>

      <div className="col-start-12 content-end justify-end">
        <Button variant="outline" size="icon">
          <PersonIcon />
        </Button>
      </div>

    </>
  );
}
