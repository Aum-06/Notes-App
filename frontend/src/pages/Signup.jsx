import {React,useState} from "react";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("please enter name")
      return
    }
    if (!email) {
      setError("Please enter email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }
    setError("");

    try {
      const response = await api.post("/user/signup", { name,email, password });
      const { token,} = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center items-center mt-28">
          <div className="w-[400px] border-[1.5px] rounded px-10 py-6 flex flex-col gap-6 ">
            <form action="" onSubmit={handleSubmit}>
              <h4 className="text-2xl mb-4 text-center font-bold">Sign Up</h4>
              <input
                type="text"
                placeholder="name"
                className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="primary-btn">Sign Up</button>
              <div className="flex items-center justify-center gap-2 mt-6 ">
                <p className="text-sm">Already have an account?</p>
                <Link
                  to="/login"
                  className="font-medium underline text-primary text-sm"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
