import Item from "@/models/items";
import dbConnect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export async function POST(req){
    
    if(req.method==='POST'){
    try{
        
        const data = await req.json();

        console.log('data-->',data)

        const {name} = data;
       console.log(name)
       await dbConnect();
       
        if(!name){
            return NextResponse.json({error: `Item can not be added! Please add a valid item`}, {status: 400})
        }

        const item = await Item.create({
            name
        })

        console.log(item,name);

        return NextResponse.json({message:'Item added Successfully'},{status:201,item})

    }
    catch(error){
        return  NextResponse.json({error: error.message}, {status: 500});
    }
}   
    
}

export async function GET(req){
    
    try{

        if(req.method==='GET'){
    
            const items = await Item.find();
    
          return  NextResponse.json({items});
        }
    }catch(error){
        console.error('Error fetching Items: ',error);
        return  NextResponse.json({error: error.message}, {status: 500});
    }

}