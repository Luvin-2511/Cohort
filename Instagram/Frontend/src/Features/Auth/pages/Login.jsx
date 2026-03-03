import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import useAuth from "../Hooks/useAuth.jsx";
import "../styles/auth.style.scss"

const Login = () => {
    const navigate = useNavigate();
    const {user, loadingAuth, handleLogin} = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginForm = async (e) => {
        e.preventDefault();
        await handleLogin(username, password)
        navigate('/')
    };


    return (
        <div className="bg-[#000000] min-h-screen w-full flex flex-col justify-between">
            <div
                className={`loadingLiner ${loadingAuth?"animate-[Loading_0.7s_linear_forwards]":""} transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center
                      md:px-16 lg:px-24
                      py-10 md:py-20 gap-10">

                {/* LEFT IMAGE - hidden on phone */}
                <div className="hidden md:flex md:w-1/2 justify-center items-center">
                    <img
                        className="md:w-[28vw] lg:w-[24vw]"
                        src="./src/assets/Landing.png"
                        alt=""
                    />
                </div>

                {/* RIGHT FORM */}
                <form
                    onSubmit={handleLoginForm}
                    className="w-full md:w-1/2 flex flex-col items-center"
                >
                    {/* LOGO */}
                    <div className="flex items-center justify-center mb-6">
                        <img
                            className="h-[15rem] md:h-[10vw] lg:h-[8vw]"
                            src="./src/assets/logobg.png"
                            alt=""
                        />
                    </div>

                    {/* INPUT FIELDS */}
                    <div className="flex flex-col gap-4 w-[90vw] md:w-[20vw] lg:w-[20vw]">
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className="rounded-xl text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-3
                         lg:rounded
                         lg:text-sm
                         text-sm md:text-base"
                            type="text"
                            placeholder="Username or email"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-xl text-white bg-[#121212]
                         placeholder-[#A8A886]
                         border border-gray-600
                         px-4 py-3
                         lg:rounded
                         lg:text-sm
                         text-sm md:text-base"
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="bg-[#3441AF] mt-5
                       text-[#AFAFB3]
                       rounded-md font-bold
                       w-[90vw] md:w-[20vw] lg:w-[20vw]
                       py-3 md:py-2"
                    >
                        Log in
                    </button>

                    {/* OR DIVIDER */}
                    <div className="flex items-center w-[90vw] md:w-[20vw] lg:w-[20vw]
                          justify-center text-white gap-3 my-5 text-sm">
                        <div className="flex-1 h-[1px] bg-gray-800"></div>
                        OR
                        <div className="flex-1 h-[1px] bg-gray-800"></div>
                    </div>

                    {/* FACEBOOK LOGIN */}
                    <div className="text-[#0095F6] cursor-pointer flex items-center
                          justify-center gap-3 font-semibold text-base md:text-sm">
                        <svg
                            fill="currentColor"
                            height="20"
                            viewBox="0 0 16 16"
                            width="20"
                        >
                            <path
                                d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z"/>
                        </svg>
                        <span>Log in with Facebook</span>
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="text-gray-400 text-sm mt-4 hover:underline cursor-pointer">
                        Forgot Password?
                    </div>

                    {/* SIGN UP */}
                    <div className="text-white text-sm mt-4">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-400">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>

            <Footer/>
        </div>
    );
};

export default Login;