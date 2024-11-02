import { useState } from "react";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Heading from "../Components/Heading";
import InputTab from "../Components/InputTab";
import SubHeading from "../Components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const apiCall = async () => {
    try {
      const response = await axios.post("https://paytm-u5jl.onrender.com/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });
      // Store the token in local storage
      localStorage.setItem("token", response.data.token);
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  const handleSignup = () => {
    apiCall();
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center w-full max-w-md p-4">
        <div className="rounded-lg bg-white shadow-lg p-6">
          <Heading heading="Sign Up" />
          <SubHeading subheading="Enter your information to create an account" />
          <InputTab onChange={(e) => setFirstName(e.target.value)} title="First Name" placeholder="John" />
          <InputTab onChange={(e) => setLastName(e.target.value)} title="Last Name" placeholder="Doe" />
          <InputTab onChange={(e) => setUsername(e.target.value)} title="Email" placeholder="johndoe@example.com" />
          <InputTab onChange={(e) => setPassword(e.target.value)} title="Password" placeholder="*****" />
          <div className="pt-4">
            <Button onClick={handleSignup} btnTitle="Sign Up" />
          </div>
          <Footer label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
