import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterForm = (e) => {
    e.preventDefault();
    const { username, email, password } = e.target.elements;
    axios
      .post("http://localhost:3000/api/auth/register", {
        email: email.value,
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        console.log(res.data);
        if(res.status === 201) navigate('/login')
      });
  };

  return (
    <div>
      <div>
        <div className="bg-[#000000] h-screen w-screen">
          <div className="cont flex p-32 pt-16 flex-col items-center justify-center">
            <form
              onSubmit={handleRegisterForm}
              className="right relative bottom-[2vw] w-[20vw] h-fit border rounded-[1px] border-[#ffffff31] flex items-center flex-col"
            >
              <div className="img relative bottom-[2.5vw]">
                <img
                  className="h-[13vw] "
                  src="./src/assets/logo.webp"
                  alt=""
                />
              </div>
              <div className="text font-semibold relative bottom-[7vw] leading-5 text-gray-400 w-[16vw] text-center">
                Sign up to see photos and videos from your friends.
              </div>
              <div className="facebook text-md text-white cursor-pointer hover:bg-[#4a67f9] relative bottom-[6vw] bg-[#4A5DF9] px-[3.2vw] py-[0.4vw] rounded-lg flex items-center justify-center gap-[0.5vw]">
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
              <div className="or flex items-center justify-center mt-5 text-white gap-[1vw] relative bottom-[5vw] text-sm ">
                <div className="idhar w-[6.5vw] h-[0.05vw] bg-gray-800"></div>
                OR
                <div className="udhar  w-[6.5vw] h-[0.05vw] bg-gray-800"></div>
              </div>
              <div className="ids flex flex-col gap-[0.5vw] mt-5 relative bottom-[4vw]">
                <input
                  className="placeholder-[#A8A886] text-white bg-[#121212] text-[0.7vw] px-[0.5vw] py-[0.6vw] border-[0.05px] rounded-sm border-gray-600 w-[16vw]"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                <input
                  className="placeholder-[#A8A886] text-white bg-[#121212] text-[0.7vw] px-[0.5vw] py-[0.6vw] border-[0.05px] rounded-sm border-gray-600 w-[16vw]"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <input
                  className="placeholder-[#A8A886] text-white bg-[#121212] text-[0.7vw] px-[0.5vw] py-[0.6vw] border-[0.05px] rounded-sm border-gray-600 w-[16vw]"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="texter1 text-gray-300 relative bottom-[3.4vw]  w-[15vw] font-light text-[0.7vw] text-center">
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <a className="text-blue-400" href="">
                  Learn More
                </a>
              </div>
              <div className="texter1 text-gray-300 relative bottom-[2.7vw]  w-[15vw] font-light text-[0.7vw] text-center">
                By signing up, you agree to our{" "}
                <a className="text-blue-400" href="">
                  Terms{" "}
                </a>{" "}
                ,{" "}
                <a className="text-blue-400" href="">
                  {" "}
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a className="text-blue-400" href="">
                  {" "}
                  Cookies Policy.
                </a>
              </div>
              <div className="button relative bottom-[1.9vw]">
                <button className="bg-[#3441AF] text-sm rounded-md font-bold text-[#AFAFB3] py-[0.4vw] px-[6.3vw]">
                  Sign up
                </button>
              </div>
            </form>
            <div className="account relative bottom-[1.4vw] w-[20vw] h-[5vw] text-white flex flex-col items-center justify-center border rounded-[1px] border-[#ffffff31]">
              <h5 className="font-semibold text-[0.82vw]">Have an account?</h5>
              <Link
                className="text-blue-400 font-semibold relative bottom-[0.28vw] text-[0.82vw]"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </div>
          <div className="relative bottom-[2vw]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
