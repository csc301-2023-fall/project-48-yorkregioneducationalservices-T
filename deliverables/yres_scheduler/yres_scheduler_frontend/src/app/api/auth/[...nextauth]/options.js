import CredentialsProvider from "next-auth/providers/credentials"
import { fetchDataPOST } from "@/app/helper";

// Options for use with NextAuth
const options = {
    session: {
      maxAge: 60 * 60 * 24 // Users stay logged in for one day before the session expires
    },
    providers: [
        CredentialsProvider({
            // Used to generate a default nextauth login/logout page
            name: 'Default Login',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password"}
            },
            // Used to authorize a user to login after submitting form
            async authorize(credentials) {
              const info = {
                username: credentials.username,
                password: credentials.password
              }
              const response = await fetchDataPOST('/account/login/', info)
              const data = await response.json();
              if (data.username && data.token) {
                return data;
              }
            }
          })
    ],
    pages: {
      signIn: '/login'
    },
    callbacks: {
      // Callback to manage jwt object
      async jwt({ token, user }) {
        if (user) {
          token.user = user.username;
          token.backend_access = user.token;
        }
        return token
      },
      // Callback to manage session object
      async session({ session, token }) {
        session.user = token.user;
        session.backend_t = token.backend_access;
        
        return session
      }
    }
}

export default options;