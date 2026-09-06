import mongoose from "mongoose";

const companySchema=mongoose.Schema({
          name:{
            type:String,
            required:true,
          },
          website:{
            type:String,
          },
          location:{
            type:String,
          },
          logo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
          }
},{timestamps:true});

export const Company= mongoose.model("Company",companySchemaß)