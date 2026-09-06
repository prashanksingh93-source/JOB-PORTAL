
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs'
export const register= async(req,res)=>{
    try{
      const {fullName,emal,phoneNumber,password,role}=req.body;
      if(!fullName || !emal || !phoneNumber || !password || !role){
          return res.status.json({
            message:"something is missing",
            succes:false
          });
      }
      const user =await User.findOne({email});
      if(user){
        return res.status(400).json({
        message:'user already exisr with this email',
        success:false

        })
      };
      const hashesPassword= await bcrypt.hash(password,10);
      await User.create({
        fullName,
        phoneNumber,
        password:hashesPassword,
        role,
      })
    }catch(error){
       console.log(error)
    }
}

export const login = async (req,res)=>{
    try{
        const{email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:'something is missing',
                success:true
            })
        };
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:'inncorrect email or password',
                success:false
            })
        }
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:'inncorrect email or password',
                success:false
            })
        }
        if(role !== user.role){

            return res.status(400).json({
                message:"Account doesn't exist with current role"
            })
        };

        const tokenData ={
            userId:user._id
        }
        const token= await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})

        user={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullName}`,
            success:true,
        })
    }catch(error){
      console.log(error)
    }
}

export const logout= async(req,res)=>{
    try{
        return res.status(200).cookie('token',"").json({
            message:'logged out successfully',
            success:true,
        })

    }catch(error){
        console.log(error)
    }
}

export const updateProfile=async(req,res)=>{
    try{
        const {fullName,email,phoneNumber,bio,skills}=req.body;

        if(!fullName || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message:"something is missing",
                succes:false,
            })
        }
        const skillsArray=skill.split(",");
        const userId=req.id;
        let user= await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:'user not found',
                success:false,
            })
        }
        user.fullName=fullName,
        user.email=email,
        user.phoneNumber=phoneNumber,
        user.profile.skills=skillsArray

        await user.save();

        user={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.prodile
        }
        return res.status(200).json({
            message:'profile updates succussefullu',
            user,
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
}