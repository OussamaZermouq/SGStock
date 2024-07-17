import * as React from "react";
import { Button } from "../ui/button";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  return (
    <>
      <div className="col-start-11 flex content-end justify-end">
        <Button variant="outline" size="icon">
          <SettingsIcon />
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
