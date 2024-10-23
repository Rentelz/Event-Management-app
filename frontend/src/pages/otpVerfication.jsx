import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMail } from "../../store/Auth/otpVerification/verifyEmailSlice";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.logIn);
  // console.log(userData);

  const email = userData?.loggedUserMail.email;
  const arr = new Array(6).fill(null); // to create inputs
  const [newArr, setNewArr] = useState(new Array(6).fill("")); // to store input values

  function refrencOfIndex(index, event) {
    const value = event.target.value;
    console.log(`Index: ${index}, Value: ${value}`);

    // Update the value in newArr
    const updatedArr = [...newArr];
    updatedArr[index] = value;
    setNewArr(updatedArr);

    // Moving to the next input if input is filled
    if (value && index < arr.length - 1) {
      document.querySelectorAll("input")[index + 1].focus();
    }
  }

  // Function to check if all fields are filled
  function areAllFieldsFilled() {
    return newArr.every((value) => value !== ""); // Returns true if all fields are filled
  }

  // Making the first input active
  // useEffect(() => {
  //   const firstInput = document.querySelectorAll("input");
  //   if (firstInput.length > 0) {
  //     firstInput[0].focus();
  //   }
  // }, []);

  useEffect(() => {
    console.log("UseEffect triggered. Email:", email);
    if (email) {
      console.log("Dispatching sendMail with email:", email);
      dispatch(sendMail({ email }));
    } else {
      console.log("Email not available");
    }
    const firstInput = document.querySelectorAll("input");
    if (firstInput.length > 0) {
      firstInput[0].focus();
    }
  }, [dispatch, email]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-2xl font-semibold mb-4">OTP Verification</p>
          <p className="text-gray-600 mb-6">
            Verify your email. We have sent you a 6-digit code.
          </p>

          <div className="flex space-x-2">
            {arr.map((_, index) => (
              <input
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
                key={index}
                maxLength={1}
                value={newArr[index]}
                onChange={(event) => refrencOfIndex(index, event)} // Pass event and index
              />
            ))}
          </div>

          {/* Conditional rendering based on whether all fields are filled */}
          {areAllFieldsFilled() ? (
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">
              Submit OTP
            </button>
          ) : (
            <p className="mt-4 text-red-500">Please fill all the fields</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
