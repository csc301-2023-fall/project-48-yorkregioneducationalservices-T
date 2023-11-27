import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Default Login',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials) {
              const user = { id: 1, username: "admin", password: "admin"}
              if (credentials.username === user.username && credentials.password === user.password) {
                return user;
              } else {
                return null;
              }
            }
          })
    ],
    pages: {
      signIn: '/login'
    }
})

export { handler as GET, handler as POST }