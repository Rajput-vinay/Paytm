import { useState } from "react";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Heading from "../Components/Heading";
import InputTab from "../Components/InputTab";
import SubHeading from "../Components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post("https://paytm-u5jl.onrender.com/api/v1/user/signin", {
        email,
        password,
      });
      // Store the token in local storage
      localStorage.setItem("token", response.data.token);
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Sign-in failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center w-full max-w-md p-4">
        <div className="rounded-lg bg-white shadow-lg p-6">
          <Heading heading="Sign In" />
          <SubHeading subheading="Enter your credentials to access your account" />
          <InputTab onChange={(e) => setEmail(e.target.value)} title="Email" placeholder="johndoe@example.com" />
          <InputTab onChange={(e) => setPassword(e.target.value)} title="Password" placeholder="*****" type="password" />
          <div className="pt-4">
            <Button onClick={handleSignin} btnTitle="Sign In" />
          </div>
          <Footer label="Don't have an account?" buttonText="Sign Up" to="/" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
