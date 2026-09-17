import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="flex items-center justify-center  max-w-7xl mx-auto">
          <form
            action=""
            className="w-1/2 border-gray-100 rounded-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5">Sign up</h1>
            <div>
              <Label>FullName</Label>
              <Input type="text" placeholder="Annu"></Input>
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Annu@gmail.com"></Input>
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="string" placeholder="9999999999"></Input>
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="enter password"></Input>
            </div>
            <div className="flex items-center justify-between">
              <RadioGroup className="flex items-center  gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Recuriter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  className="cursor-pointer"
                ></Input>
              </div>
            </div>
            <Button type="submit" className="w-full my-4 bg-gray-700 text-white">Signup</Button>
            <span className="text-sm">Already have an Account ? <Link to="/login" className="text-blue-600 text-sm">Login</Link></span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
