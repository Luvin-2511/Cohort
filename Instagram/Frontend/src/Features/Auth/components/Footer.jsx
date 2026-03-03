import React from "react";
import { footerLinks } from "../../../json/footerTags.js";

const Footer = () => {
  return (
    <div>
      <div className="footer w-[60vw] relative bottom-[1.7vw] h-[2vw] m-auto">
        <div className="first flex items-center justify-center gap-[0.9vw]">
          {footerLinks.map((footerTag,idx)=>{
            return <div
            key={idx}
             className="cont text-gray-400 font-sm text-[0.69vw] cursor-pointer hover:underline">
            footerTag
          </div>
          })}          
        </div>
        <div className="second flex items-center justify-center gap-[1vw] mt-[1.2vw]">
          <div className="cont text-gray-400 font-sm text-[0.69vw]">
            English
          </div>
          <div className="cont text-gray-400 font-sm text-[0.69vw]">
            © 2026 Snaply from Luvin
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
