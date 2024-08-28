import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({auth,  request: { nextUrl } }) {
      const isLoggedIn = auth?.user
      const isOnCommandes = nextUrl.pathname.startsWith("/Commande");
      const isOnProduits = nextUrl.pathname.startsWith("/Produits");
      const isOnCategories = nextUrl.pathname.startsWith("/Categories");
      const isOnClients = nextUrl.pathname.startsWith("/Clients");
      const isOnFournisseurs = nextUrl.pathname.startsWith("/Fournisseurs");
      const isOnTest = nextUrl.pathname.startsWith("/Test");
      const isOnDashboard = nextUrl.pathname.startsWith("/Dashboard");
      const isOnUtilisateurs =  nextUrl.pathname.startsWith("/Users");
      if (
        isOnDashboard ||
        isOnProduits ||
        isOnCategories ||
        isOnClients ||
        isOnFournisseurs ||
        isOnTest ||
        isOnCommandes ||
        isOnUtilisateurs
      ) {
        if (!!isLoggedIn) {
          return true;
        }
        return false; //redirects to the login page
      } else if (!!isLoggedIn) {
        return Response.redirect(new URL("/Dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
