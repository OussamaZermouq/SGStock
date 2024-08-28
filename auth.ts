import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "@/actions/actions";
import prisma from "@/lib/db";

const bcrypt = require('bcryptjs')

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },  // Use JWT for session management
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate and fetch user from the database
        const { email, password } = credentials;
        const user = await getUser(email);
        if (!user) {
          throw new Error('No user found with the email');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // Return the user object with the role
        return {
          id: user.id,
          email: user.email,
          image:user.image,
          role: user.role,  // Include role in user object
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role; // Add role to JWT token
      }
      return token;
    },
    async session({ session, token }) {
      
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.role = token.role; // Add role to session

      return session;
    },
  },
});


// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import { getUser } from "@/actions/actions";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@/lib/db";


// var bcrypt = require('bcryptjs');
// export const { auth, signIn, signOut, handlers } = NextAuth({
//   ...authConfig,
//   adapter:PrismaAdapter(prisma),
//   session:{strategy:'jwt'},
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) return null;
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (passwordMatch) return user;
//         }
//         console.log("invalid credentials");
//         return null;
//       },  
//     }),
//   ],
// });
