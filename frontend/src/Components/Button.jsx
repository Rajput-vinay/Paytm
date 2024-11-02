const Button = ({ btnTitle, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-gray-800 
      hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 
      font-medium rounded-lg text-sm md:text-base px-4 py-2 
      sm:px-5 sm:py-3 mt-2 me-2 mb-2 transition duration-200 ease-in-out"
    >
      {btnTitle}
    </button>
  );
};

export default Button;
