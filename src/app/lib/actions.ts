"use server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { auth, signIn } from "../../../auth";
import { AuthError } from "next-auth";
import { signOut } from "../../../auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.stack);
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut({
      redirectTo: "/login",
      redirect: true,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
}
export async function getSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.log(error);
  }
}
