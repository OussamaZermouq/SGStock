import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const isOnDashboard = nextUrl.pathname.startsWith("/Commande");
      const isOnProduits = nextUrl.pathname.startsWith("/Produits");
      const isOnCategories = nextUrl.pathname.startsWith("/Categories");
      const isOnClients = nextUrl.pathname.startsWith("/Clients");
      const isOnFournisseurs = nextUrl.pathname.startsWith("/Fournisseurs");
      const isOnTest = nextUrl.pathname.startsWith("/Test");


      if (isOnDashboard || isOnProduits || isOnCategories || isOnClients || isOnFournisseurs || isOnTest) {
        if (isLoggedIn) {
            return true
        };
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        
        return Response.redirect(new URL("/Commande", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
