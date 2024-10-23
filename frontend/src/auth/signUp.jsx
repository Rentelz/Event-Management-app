import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendSignUpData } from "../../store/Auth/signUpSlice";
import mainImage from "../assets/pexels-maegregorio-1776151.jpg";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner"; // Import spinner
//import { toast } from "react-toastify";
export const SignUpPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userData } = useSelector((state) => state.signUp);

  const handleSubmit = (e) => {
    e.preventDefault(); // This line is crucial
    dispatch(sendSignUpData({ username, email, password }));

    //  navigate("/login");
  };

  useEffect(() => {
    if (userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={50}
          width={50}
          color="#4fa94d"
          secondaryColor="#4fa94d"
          visible={true}
          ariaLabel="oval-loading"
        />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error.errors
        ? error.errors.join(", ")
        : "An unknown error occurred";
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="flex bg-customGray w-screen h-screen">
      <div className="w-3/5 bg-primaryBlue">
        <img
          className="h-screen w-full object-cover"
          src={mainImage}
          alt="Description"
        />
      </div>

      <div className="w-2/5 bg-customGray flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-grayText mb-6 text-center">
            Sign-up
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Name</h2>
              <input
                value={username}
                className="bg-white text-gray-900 border border-gray-300 rounded-lg py-2 px-4 focus:border-primaryBlue focus:outline-none focus:ring-1 focus:ring-primaryBlue w-full"
                type="text"
                placeholder="Name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Email</h2>
              <input
                value={email}
                className="bg-white text-gray-900 border border-gray-300 rounded-lg py-2 px-4 focus:border-primaryBlue focus:outline-none focus:ring-1 focus:ring-primaryBlue w-full"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Password</h2>
              <input
                value={password}
                className="bg-white text-gray-900 border border-gray-300 rounded-lg py-2 px-4 focus:border-primaryBlue focus:outline-none focus:ring-1 focus:ring-primaryBlue w-full"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-primaryBlue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
