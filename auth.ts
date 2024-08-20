import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "@/actions/actions";
const bcrypt = require('bcrypt')


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(user)
          if (!user) return null;
          
          const passwordMatch = await bcrypt.compare(user.password, password)
          console.log(passwordMatch)
          if (!passwordMatch) return user;
        }
        console.log('invalid credentials')
        return null;
      },
    }),
  ],
});
