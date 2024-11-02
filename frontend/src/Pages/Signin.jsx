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
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
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
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 p-2 h-max px-4">
          <Heading heading="Sign In" />
          <SubHeading subheading="Enter your credentials to access your account" />
          <InputTab onChange={(e) => setEmail(e.target.value)} title="Email" placeholder="johndoe@example.com" />
          <InputTab onChange={(e) => setPassword(e.target.value)} title="Password" placeholder="*****" type="password" />
          <div className="pt-4">
            <Button onClick={handleSignin} btnTitle="Sign In" />
          </div>
          <Footer label="Don't have an account?" buttonText="Sign Up" to="/signup" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
