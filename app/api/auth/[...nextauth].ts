import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Definindo tipos para usuário
export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Definindo a interface para o token JWT
export interface CustomJWT extends JWT {
  accessToken?: string;
  user?: User;
}

// Definindo a interface para sessão
export interface CustomSession {
  user?: User;
  accessToken?: string;
  expires: string;
}

// Configuração do NextAuth
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
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

  ],
  // Configuração de sessões e tokens
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 dias
  },
  // Configuração de callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      const customToken = token as CustomJWT;
      
      // Adiciona os dados do usuário ao token quando faz login
      if (user) {
        customToken.user = {
          id: user.id as string,
          name: user.name as string,
          email: user.email as string,
          role: (user as User).role || "user",
        };
        
        // Se a API retornar um token, adicione-o ao JWT
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (account?.provider === "credentials" && (user as any).accessToken) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          customToken.accessToken = (user as any).accessToken;
        }
      }
      
      return customToken;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      const customSession = session as unknown as CustomSession;
      
      // Adiciona os dados do usuário à sessão
      if (customToken.user) {
        customSession.user = customToken.user;
      }
      
      // Adiciona o token de acesso à sessão
      if (customToken.accessToken) {
        customSession.accessToken = customToken.accessToken;
      }
      
      return customSession;
    },
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

// Middleware para proteger rotas
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("next-auth.session-token");
  
  // Se não houver token na cookie, redireciona para login
  if (!sessionToken) {
    return Response.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

// Configuração do middleware
export const config = {
  matcher: [
    // Rotas protegidas
    "/dashboard/:path*"
  ],
};