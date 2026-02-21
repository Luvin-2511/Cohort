import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)

    const handleLoginForm = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/auth/login", {
            username: username,
            password: password
        }).then((res) => {
            console.log(res.data)
            if (res.status === 200) navigate('/')
        })
    };

    return (
        <div>
            <div>
                <div className="bg-[#000000] h-screen w-screen">
                    <div className="cont flex p-32 pt-36 items-center justify-center">
                        <div className="left relative left-[3vw] top-[1vw] w-[30vw] h-[60vh]">
                            <div className="image">
                                <img src="./src/assets/Landing.png" alt=""/>
                            </div>
                        </div>

                        <form
                            onSubmit={handleLoginForm}
                            className="right relative left-[2vw] bottom-[2vw] w-[30vw] h-[60vh] flex items-center flex-col"
                        >
                            <div className="img ">
                                <img className="h-[13vw]" src="./src/assets/logo.webp" alt=""/>
                            </div>
                            <div className="ids flex flex-col gap-[0.35vw] relative bottom-[2.7vw]">
                                <input
                                    onInput={(e)=>{setUsername(e.target.value)}}
                                    className="placeholder-[#A8A886] text-white bg-[#121212] text-[0.7vw] px-[0.5vw] py-[0.6vw] border-[0.05px] rounded-sm border-gray-600 w-[16vw]"
                                    name="usernameOrEmail"
                                    type="text"
                                    placeholder="Username or email"
                                />
                                <input
                                    onInput={(e)=>{setPassword(e.target.value)}}
                                    className="placeholder-[#A8A886] text-white bg-[#121212] text-[0.7vw] px-[0.5vw] py-[0.6vw] border-[0.05px] rounded-sm border-gray-600 w-[16vw]"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="button relative bottom-[1.9vw]">
                                <button
                                    className="bg-[#3441AF] text-sm rounded-md font-bold text-[#AFAFB3] py-[0.4vw] px-[6.8vw]">
                                    Log in
                                </button>
                            </div>
                            <div
                                className="or flex items-center justify-center text-white gap-[1vw] relative bottom-[1vw] text-sm ">
                                <div className="idhar w-[6.5vw] h-[0.05vw] bg-gray-800"></div>
                                OR
                                <div className="udhar  w-[6.5vw] h-[0.05vw] bg-gray-800"></div>
                            </div>
                            <div
                                className="facebook text-md text-[#0095F6] cursor-pointer relative top-[1vw] flex items-center justify-center gap-[0.5vw]">
                                <svg
                                    aria-label="Log in with Facebook"
                                    className="x1lliihq x1n2onr6 x173jzuc"
                                    fill="currentColor"
                                    height="20"
                                    role="img"
                                    viewBox="0 0 16 16"
                                    width="20"
                                >
                                    <title>Log in with Facebook</title>
                                    <g clipPath="url(#a)">
                                        <path
                                            d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z"
                                            fill="currentColor"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <rect fill="currentColor" height="16" width="16"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div className="text-sm font-semibold">
                                    Log in with Facebook
                                </div>
                            </div>
                            <div
                                className="forgot cursor-pointer hover:underline text-white text-[0.85vw] relative top-[2vw] font-semibold">
                                Forgot Password?
                            </div>
                            <div className="account text-sm relative top-[5vw] font-medium text-white">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-blue-400">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default Login;
