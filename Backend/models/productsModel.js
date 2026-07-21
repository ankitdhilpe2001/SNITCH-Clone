import mongoose, { Mongoose } from "mongoose"

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    price:{
       amount:{
        type:String,
        required:true,
       },   
       currency:{
        type:String,
        enum:["USD","INR","EUR","JPY"],
        default:"INR"
       }
    },
    imgaes:[
        {
            url :{
                type:String,
                required:true,
            }
        }
    ]
},{timestamps:true});

const Product = mongoose.model('product',productSchema);
export default Product;