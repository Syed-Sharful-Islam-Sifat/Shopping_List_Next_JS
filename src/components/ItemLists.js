"use client"
import React, { useEffect, useState } from 'react'

const ItemLists = () => {
    const [items,setItems] = useState([]);

    useEffect(()=>{
        async function fetchItems(){
            try{
                const resposne = await fetch('/api/item');

                if(!resposne.ok){
                    throw new Error('Network Response was not ok');
                }

                const data = await resposne.json();
               
                setItems(data.items);
            }catch(error){
                console.error('Error: ',error)
            }
        }

        fetchItems();
    },[items])

    async function handleDeleteItem(id){
       
        const response = await fetch(`/api/item/${id}`,{
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    }
  return (
    <div>
     {items.map((item)=>{
        
        return (
            <div className='items' key = {item._id}>
                <li >{item.name}</li>
                <button onClick={()=>handleDeleteItem(item._id)}>Delete</button>
            </div>
        )
     })}
    </div>
  )
}

export default ItemLists