import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Header = () => {
    const [user] = useAuthState(auth);

    const logoutUser = () => {
        signOut(auth).then(() => {
            alert("user logouted");
        });
    };

    return (
        <div className="navbar bg-primary fixed top-0 w-full z-1">
            {/* Starting mobile device navbar */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 outline-none"
                    >
                        {!user ? (
                            <li>
                                <Link to={"/login"}>login</Link>{" "}
                            </li>
                        ) : (
                            <li>
                                <Link to={"/createPost"}>create post</Link>
                            </li>
                        )}
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">socio!</a>
            </div>
            {/* Ending mobile device navbar */}

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link  className="md:text-lg md:font-semibold" to={"/"}>Home</Link>
                    </li>
                    {!user ? (
                        <li>
                            <Link  className="md:text-lg md:font-semibold" to={"/login"}>login</Link>{" "}
                        </li>
                    ) : (
                        <li>
                            <Link className="md:text-lg md:font-semibold" to={"/createPost"}>create post</Link>
                        </li>
                    )}
                </ul>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    {user && (
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="">
                                <img className="w-10 rounded-full" src={user?.photoURL} alt="" />
                            </div>
                        </label>
                    )}
                    <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <h1 className="md:font-bold md:text-lg justify-center">{user?.displayName}</h1>
                        </li>

                        <li>
                            <button className="btn btn-error btn-sm" onClick={logoutUser}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
