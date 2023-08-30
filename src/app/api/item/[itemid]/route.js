import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}){

    const item = params.itemid;

    const itemid = item.toString();
    console.log(itemid);

    if(req.method==='DELETE'){
       
        try{
            await Item.findByIdAndDelete(itemid);

           return NextResponse.json({message: 'Item deleted Succesfully'})

        }catch(error){
            return NextResponse.json({error: error.message},{status:400})
        }
     }
}