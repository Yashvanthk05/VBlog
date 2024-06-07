import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import User from '@models/user';
import { connecttoDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
      } catch (error) {
        console.error('Error fetching user session:', error);
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connecttoDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture
          })
        }

        return true;
      } catch (error) {
        console.error('Error during sign-in:', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
