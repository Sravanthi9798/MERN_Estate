import mongoose from 'mongoose';

const listingSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const ListingUser=mongoose.model('User',listingSchema);

export default ListingUser;