/* eslint-disable react/prop-types */

import Admin from "../assets/admin_assets/Admin.jpg";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center px-[4%] py-2 justify-between">
      <img className="w-[max(10%,80px)]" src={Admin} alt="" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
