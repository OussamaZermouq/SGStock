"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const { data: session } = useSession();

  const handleSignOutClick = async () => {
    if (session) {
      // Sign out the user and redirect to the home page
      await signOut({ callbackUrl: '/' });
    } else {
      console.error("No active session found.");
    }
  };

  return (
    <div className="sidebar">
      <p>
        Session:
        {session?.user?.email}
      </p>
      <Button onClick={handleSignOutClick}>
        Se Déconnecter
      </Button>
    </div>
  );
}
