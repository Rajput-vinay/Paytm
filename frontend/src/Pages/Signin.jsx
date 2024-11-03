import { useState } from "react";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Heading from "../Components/Heading";
import InputTab from "../Components/InputTab";
import SubHeading from "../Components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    // Check for empty input fields
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post("https://paytm-u5jl.onrender.com/api/v1/user/signin", {
        username,
        password,
      });

      // Check if the response contains a token
      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem("token", response.data.token);
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        alert("Sign-in failed. Token not found in response.");
      }
    } catch (error) {
      // Improved error logging
      console.error("Error during sign-in:", error.response || error);
      alert("Sign-in failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center w-full max-w-md p-4">
        <div className="rounded-lg bg-white shadow-lg p-6">
          <Heading heading="Sign In" />
          <SubHeading subheading="Enter your credentials to access your account" />
          <InputTab 
            onChange={(e) => setUsername(e.target.value)} 
            title="Username" 
            placeholder="johndoe@example.com" 
            value={username}
          />
          <InputTab 
            onChange={(e) => setPassword(e.target.value)} 
            title="Password" 
            placeholder="*****" 
            type="password" 
            value={password}
          />
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
