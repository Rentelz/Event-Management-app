import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendLogInData } from "../../store/Auth/loginSlice";
import { Oval } from "react-loader-spinner"; // Import spinner
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loading, error] = useSelector((state) => state.logIn);
  const { loading, error, userData } = useSelector((state) => state.logIn);
  function getLoginData(e) {
    e.preventDefault();
    console.log(email, password);
    dispatch(sendLogInData({ email, password }));
  }

  useEffect(() => {
    if (userData) {
      //navigate("/verify-otp");
      navigate("/verify-otp", { state: { email } });
    }
  }, [userData, navigate, email]);

  // console.log(userData);

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
    <>
      <h1>Login to book your faviurate event-</h1>
      <form>
        <div>
          <h1>Email</h1>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <h1>Password</h1>
          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={getLoginData}>Login</button>
      </form>
    </>
  );
};

export default LoginPage;
