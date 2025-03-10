import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

// Definindo a interface para o token JWT
interface CustomJWT extends JWT {
  accessToken?: string;
  user?: {
    id: string | undefined;
    name: string | null | undefined;
    email: string | undefined | null;
    role: string;
  };
}

// Configuração do NextAuth
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      // Função para autenticar o usuário
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Aqui você deve implementar a lógica para verificar as credenciais no seu banco de dados
          // Este é apenas um exemplo, substitua pelo seu próprio código
          const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const user = await response.json();
          
          return user;
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      }
    }),
    // Você pode adicionar outros provedores aqui (Google, GitHub, etc.)
  ],
  // Configuração de sessões e tokens
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  // Configuração de cookies
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  // Páginas personalizadas
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
});