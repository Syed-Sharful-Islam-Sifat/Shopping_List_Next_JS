import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
   
})

const Item = mongoose.models.Item || mongoose.model('Item',itemSchema);
export default Item;