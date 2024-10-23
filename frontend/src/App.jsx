import "./App.css";
import LoginPage from "./auth/login";
import { ToastContainer } from "react-toastify";
import { SignUpPage } from "./auth/signUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerfication from "./pages/otpVerfication";
function App() {
  return (
    <>
      {/* Toast container for notifications */}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<OtpVerfication />} />
          {/* <Route path="*" element={<NotFound />} /> Catch-all for 404 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
