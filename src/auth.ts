import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isAdminRole } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { adminSignInSchema } from "@/schemas/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = adminSignInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: parsedCredentials.data.email,
          },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isPasswordValid = await verifyPassword(
          parsedCredentials.data.password,
          user.passwordHash,
        );

        if (!isPasswordValid || !isAdminRole(user.role)) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role =
          typeof token.role === "string" ? token.role : undefined;
      }

      return session;
    },
  },
});
