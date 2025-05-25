import  { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    console.log("hello ")
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white shadow">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex font-medium items-center gap-5" style={{marginLeft:"800px"}}>
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/browse">Browse</Link>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Auth Buttons / Avatar */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User Avatar"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User Avatar"}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            // X icon
            <svg
              className="h-6 w-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="h-6 w-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="flex flex-col p-4 space-y-3">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}

            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 border border-gray-300 rounded text-center hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 bg-[#6A38C2] text-white rounded text-center hover:bg-[#5b30a6]"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user.role === "student" && (
                  <li>
                    <Link
                      to="/profile"
                      className="block px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      View Profile
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
