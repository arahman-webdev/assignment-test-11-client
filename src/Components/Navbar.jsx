import { Link, NavLink } from "react-router-dom";
import { FaHome, FaRegUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { useContext, useState } from "react";

import { FcAbout } from "react-icons/fc";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    console.log(user)

    const handleSignOut = () => {
        logOutUser()
            .then(() => {
                console.log("User logged out");
                setDropdownOpen(false);
            })
            .catch((error) => {
                console.error("Sign out error:", error);
            });
    };

    const links = (
        <>
            <NavLink to="/" className="flex items-center gap-1">
                Home
            </NavLink>
            <NavLink to="/available-cars" className="flex items-center gap-1">
                Available Cars
            </NavLink>


        </>
    );




    return (
        <div className="sticky top-0 bg-[#fff] w-full p-5 z-50 shadow-lg">
            <div className="navbar w-4/5 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden bg-[#FF3600]">
                            <i className="text-black font-semibold">
                                <FaBars size={25} />
                            </i>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content mt-3 w-[490px] p-2 text-2xl z-50 -left-20 bg-[#fff] text-[#000002]"
                        >
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="text-4xl text-[#000002] font-bold sm:block hidden">
                        <span className="text-4xl font-serif font-extrabold text-[#FF3600]">Ride</span>Xpress
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6 text-xl font-semibold text-[#000002]">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end text-[#ffffffa6]">
                    {user ? (
                        <div className="relative">
                            <img
                                src={user?.photoURL || "/default-avatar.png"}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-7 bg-[#F4F5FE] shadow-md rounded-lg z-50 border w-[250px] p-4">
                                    <div className="w-500px">
                                        <ul className="menu menu-horizontal px-1 text-[#111] flex flex-col">
                                            <li className="hover:bg-[#e4e6f8]">
                                                <NavLink
                                                    
                                                    to="/add-car"
                                                >
                                                    Add Car
                                                </NavLink>
                                            </li>
                                            <li className="hover:bg-[#e4e6f8]">
                                                <NavLink
                                                    
                                                    to="/my-cars"
                                                >
                                                    My Cars
                                                </NavLink>
                                            </li>
                                            <li className="hover:bg-[#e4e6f8]">
                                                <NavLink
                                                    
                                                    to="/my-booking"
                                                >
                                                    My Bookings
                                                </NavLink>
                                            </li>
                                            <li className="hover:bg-[#e4e6f8]">
                                                <NavLink
                                                    
                                                    to="/manage-car"
                                                >
                                                    Manage Cars
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleSignOut}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-[#e4e6f8] rounded flex items-center gap-2"
                                        >
                                            <FaSignOutAlt />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/register" className="bg-[#FF3600] rounded-none px-6 py-2 text-white">
                                Register
                            </Link>
                            <Link to="/login" className="bg-[#0d81fd] rounded-none px-6 py-2 text-white">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default Navbar;
