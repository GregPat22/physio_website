import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Federico Benni</h1>
      <ul className="flex items-center gap-x-14 mr-4">
        <li className="text-[10px] font-light tracking-[1px]">RISORSE</li>
        <li className="text-[10px] font-light tracking-[1px]">CONTATTI</li>
        <li className="text-[10px] font-light tracking-[1px] bg-[#2B3A54] text-white rounded-tl-lg py-2 px-4">CHI SONO</li>
      </ul>
    </nav>
  );
};

export default Navbar;
