import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from '../../../lib/prisma'
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ], callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const userExists = await prisma.user.findFirst({ where: { email: profile.email }, take: 1 });
                if (!userExists) {
                    await prisma.user.create({
                        data: {
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                        }
                    });
                }
                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
        async session({ session }) {
            const sessionUser = await prisma.user.findFirst({
                where: { email: session.user.email, },
                take: 1,
            });
            session.user.id = String(sessionUser.id);
            session.user.adresse = String(sessionUser.adresse)
            session.user.secteur = String(sessionUser.secteur)
            return session;
        },
    }


})