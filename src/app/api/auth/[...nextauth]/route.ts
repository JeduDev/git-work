import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string
        })
    ],

};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
