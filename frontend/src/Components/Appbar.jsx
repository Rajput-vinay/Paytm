import { useNavigate } from "react-router-dom";

const Appbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        
        navigate('/signin'); 
    };

    return (
        <div className=" shadow h-14 flex justify-between items-center bg-white">
            <div className="flex flex-col justify-center h-full ml-4 text-lg font-semibold">
                PayTM App
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4 text-lg">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                    <div className="text-xl">U</div>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-transparent mr-12 border-none text-red-500 font-medium hover:text-red-700 transition-colors duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Appbar;
