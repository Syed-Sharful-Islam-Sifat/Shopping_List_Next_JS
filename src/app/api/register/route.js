import User from "@/models/user";
import dbConnect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export async function POST(req){

    console.log(req)
    if(req.method==='POST'){
    try{
        const data = await req.json();
        console.log('data--->',data)
        const {name,email,password} = data;
        dbConnect();
        
        if(!name || !email || !password){
            
           return NextResponse.json({error:'Please fill all the required fields'} , {status: 400});
        }
        
        const userExists = await User.findOne({email:email});
        
        if(userExists){
            return NextResponse.json({error:'User already exists'} , {status: 400});
        } 

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt)
        const user = await User.create({
            name,
            email,
            password:hash
        });

        return  NextResponse.json({message: 'User created Successfully'} , {status: 201,user});
    }
    catch(error){
        return  NextResponse.json({error: error.message}, {status: 500});
    }
}   
    
}