import CredentialsProvider from "next-auth/providers/credentials"

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
              // TODO: Make this user not hardcoded
              const user = { id: 1, username: "admin", password: "admin"}

              if (credentials.username !== user.username && credentials.password !== user.password) {
                throw new Error("Incorrect username and password");
              } else if (credentials.username !== user.username ) {
                throw new Error("Incorrect username");
              } else if (credentials.password !== user.password) {
                throw new Error("Incorrect Password");
              }
              return user;
            }
          })
    ],
    pages: {
      signIn: '/login'
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.user = user.username;
          token.backend_access = '12345678';
        }
        return token
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token and user id from a provider.
        session.user = token.user;
        session.token = token;
        
        return session
      }
    }
}

export default options;