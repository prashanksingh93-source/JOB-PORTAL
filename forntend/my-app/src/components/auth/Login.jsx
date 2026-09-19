import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT }from "../../../utils/constant.js"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
  const res= await axios.post(`${USER_API_END_POINT}/register`)
    }catch(error){
      console.log(error)
    }
    
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center  max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border-gray-100 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Log in</h1>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Annu@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="enter password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                id="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="student">Student</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                id="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>
          <Button type="submit" className="w-full my-4 bg-gray-700 text-white">
            Login
          </Button>
          <span className="text-sm6">
            Dont't have an account ?{" "}
            <Link to="/signup" className="text-blue-600 text-sm">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
