"use client"
import ItemLists from '@/components/ItemLists';
import React, { useState } from 'react'

const AddItem = () => {

    const [name,setName] = useState('');
    async function handleAddItem(e){
        e.preventDefault();
        const response = await fetch('/api/item',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:name})
        })

        console.log('response-->',response);

    }

  return (

    <div className='add-fetch'>
       <div className='add'>

        <form onSubmit={handleAddItem}>
            <input type='text' placeholder='Add Item...' onChange = {(e)=>setName(e.target.value)}/>
            <button>Add Item</button>
        </form>
        </div>
        <div className='fetch'>
        <ItemLists/>
        </div>
    </div>

  )
}

export default AddItem