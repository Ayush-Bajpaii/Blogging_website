import { useState } from "react"; 
import {Link,Outlet} from "react-router-dom";
import logo from "../imgs/logo.png";
const Navbar = () => {

    const [ searchBoxVisibility , setSearchBoxVisibility ] = useState(false);

    return  (
        <>
       <nav className = "navbar">

            <Link to = "/" className= "flex-none w-12">
            <img src={logo} className />
            </Link>
            
            <div className={"absolute bg-white w-full left-0 top-full mt-1  border-gray-200 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto rounded-2xl md:show " + (
                searchBoxVisibility ? "show" : "hide")}>
    <div className="relative">
        <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-gray-100 p-4 pl-6 pr-12 rounded-full placeholder:text-gray-600 md:pl-12 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 shadow-md hover:bg-gray-200"
        />
        <i className="fi fi-rr-search absolute right-6 md:pointer-events-none top-1/2 -translate-y-1/2 text-2xl text-gray-500 transition-all duration-300 hover:text-gray-700"></i>
        </div>
    </div>

    <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
        onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
        >
            <i className="fi fi-rr-search text-xl"></i>
        </button>
        <Link to="/editor" className="hidden md:flex gap-2 link">
        <i class="fi fi-rr-file-edit"></i>
                <p>Write</p>
        </Link>

        <Link className="btn-dark py-2" to="/signin">
                Sign In
        </Link>

        <Link className="btn-light py-2 hidden md:block" to="/signup">
                Sign Up
        </Link>
    </div>    

            </nav>

                <Outlet/>
            </>
    )
}

export default Navbar;