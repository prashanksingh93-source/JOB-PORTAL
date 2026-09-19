import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

   if (input.file) {
  formData.append("file", input.file);
}
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
       withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    }catch (error) {
  console.log("Signup error:", error);
  console.log("Backend response:", error.response?.data);

  toast.error(
    error.response?.data?.message || "Something went wrong"
  );
}
  };

  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="flex items-center justify-center  max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-1/2 border-gray-100 rounded-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5">Sign up</h1>
            <div>
              <Label>FullName</Label>
              <Input
                type="text"
                value={input.fullName}
                name="fullName"
                onChange={changeEventHandler}
                placeholder="Annu"
              ></Input>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Annu@gmail.com"
              ></Input>
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                value={input.phoneNumber}
                onChange={changeEventHandler}
                name="phoneNumber"
                type="string"
                placeholder="9999999999"
              ></Input>
            </div>
            <div>
              <Label>Password</Label>
              <Input
                value={input.password}
                onChange={changeEventHandler}
                name="password"
                type="password"
                placeholder="enter password"
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
              <div className="flex items-center gap-1">
                {" "}
                <Label>Profile</Label>{" "}
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                ></Input>{" "}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full my-4 bg-gray-700 text-white"
            >
              Signup
            </Button>
            <span className="text-sm6">
              Already have an Account ?{" "}
              <Link to="/login" className="text-blue-600 text-sm">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
