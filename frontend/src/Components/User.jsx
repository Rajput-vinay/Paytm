import { useNavigate } from "react-router-dom";
import Button from './Button';

const User = ({ user }) => {
    const navigate = useNavigate();
    
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 md:h-10 md:w-10 sm:h-8 sm:w-8">
                    <div className="flex flex-col justify-center h-full text-xl md:text-lg sm:text-base">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className="text-base md:text-sm sm:text-xs">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button onClick={(e) => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }}
                    btnTitle={"Send Money"} />
            </div>
        </div>
    );
};

export default User;
