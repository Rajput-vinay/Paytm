import { useState, useEffect } from "react";
import Appbar from "../Components/Appbar";
import Balance from "../Components/Balance";
import Users from "../Components/Users";
import axios from "axios";

const Dashboard = () => {
    const [value, setValue] = useState("");

    const apicall = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setValue(response.data.balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    useEffect(() => {
        apicall();
    }, [value]);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={value} />
                <Users />
            </div>
        </div>
    );
};

export default Dashboard;