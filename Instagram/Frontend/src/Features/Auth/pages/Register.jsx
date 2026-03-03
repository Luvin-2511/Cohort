import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/auth.style.scss"
import useAuth from "../Hooks/useAuth.jsx";

const Register = () => {
    const navigate = useNavigate();
    const {handleRegister, loadingAuth} = useAuth()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        await handleRegister(username, email, password)
        navigate('/')
    };

    return (
        <div className="bg-black min-h-screen flex flex-col justify-between">
            <div
                className={`loadingLiner ${loadingAuth ? "animate-[Loading_0.7s_linear_forwards]" : ""} transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}>
            </div>
            <div className="flex flex-col items-center justify-center
                      py-10 md:py-16 lg:py-20">

                {/* REGISTER CARD */}
                <form
                    onSubmit={handleRegisterForm}
                    className="min-w-[clamp(20rem,20vw,50rem)] md:w-[26vw] lg:w-[22vw]
                     border border-[#ffffff31]
                     flex flex-col items-center
                     px-6 py-8"
                >
                    {/* LOGO */}
                    <img
                        className="h-[10rem] md:h-[8vw] lg:h-[6vw] mb-4"
                        src="./src/assets/logobg.png"
                        alt=""
                    />

                    {/* TEXT */}
                    <p className="text-gray-400 text-sm text-center mb-6">
                        Sign up to see photos and videos from your friends.
                    </p>

                    {/* FACEBOOK BUTTON */}
                    <div className="w-full bg-[#4A5DF9] hover:bg-[#3f53e6]
                          text-white py-2 rounded-lg
                          flex items-center justify-center gap-3
                          font-semibold text-sm cursor-pointer mb-5">
                        <svg fill="currentColor" height="18" viewBox="0 0 16 16" width="18">
                            <path
                                d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z"/>
                        </svg>
                        Log in with Facebook
                    </div>

                    {/* OR DIVIDER */}
                    <div className="flex items-center w-full text-white gap-3 text-sm mb-5">
                        <div className="flex-1 h-[1px] bg-gray-800"></div>
                        OR
                        <div className="flex-1 h-[1px] bg-gray-800"></div>
                    </div>

                    {/* INPUTS */}
                    <div className="flex flex-col gap-3 w-full">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-md text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-2 text-sm"
                            type="text"
                            placeholder="Email"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-md text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-2 text-sm"
                            type="password"
                            placeholder="Password"
                        />

                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className="rounded-md text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-2 text-sm"
                            type="text"
                            placeholder="Username"
                        />
                    </div>

                    {/* SMALL TEXT */}
                    <p className="text-gray-400 text-xs text-center mt-5">
                        People who use our service may have uploaded your contact
                        information.{" "}
                        <span className="text-blue-400 cursor-pointer">Learn More</span>
                    </p>

                    <p className="text-gray-400 text-xs text-center mt-3">
                        By signing up, you agree to our{" "}
                        <span className="text-blue-400 cursor-pointer">Terms</span>,{" "}
                        <span className="text-blue-400 cursor-pointer">Privacy Policy</span>{" "}
                        and{" "}
                        <span className="text-blue-400 cursor-pointer">Cookies Policy</span>.
                    </p>

                    {/* SIGN UP BUTTON */}
                    <button
                        type="submit"
                        className="bg-[#3441AF] mt-6
                       text-[#AFAFB3]
                       rounded-md font-bold
                       w-full py-2"
                    >
                        Sign up
                    </button>
                </form>

                {/* LOGIN CARD */}
                <div className="w-[90vw] md:w-[26vw] lg:w-[22vw]
                        border border-[#ffffff31]
                        text-white
                        flex items-center justify-center
                        mt-4 py-5 text-sm">
                    Have an account?{" "}
                    <Link to="/login" className="text-blue-400 ml-2 font-semibold">
                        Log in
                    </Link>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Register;