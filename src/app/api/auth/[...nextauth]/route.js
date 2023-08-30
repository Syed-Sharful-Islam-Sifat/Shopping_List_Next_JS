import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/config/db";
import User from "@/models/user";

export const authOptions = {
    session:{
        strategy: "jwt"
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials,req){
                try{
                dbConnect();
                const {email , password} = credentials;
                if(!email||!password){
                    throw new Error('Please fill all the required fields')
                }
                console.log('cred',credentials);
                const user = await User.findOne({email:email});
                console.log(user)
                if(!user){
                    throw new Error('User doesnot exist');
                }

                const isPasswordMatched = await bcrypt.compare(password,user.password);
                console.log('checking--->',isPasswordMatched,typeof(password),typeof(user.password))
                if(!isPasswordMatched){
                    throw new Error('Invalid credentials');
                }

                return user
            }catch(error){
                console.log(error)
            }
        },
        }),

    ],

    pages:{
      signIn: '/login'
    },

    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST}