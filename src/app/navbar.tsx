import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 fixed top-0 left-0 right-0 z-1">
      <a href="/" className="text-2xl font-bold">
        <img src="/sign.svg" alt="Logo" className="h-8 w-auto" />
      </a>
      <div className=" ">
        <ul className="mr-4 flex items-center gap-x-14">
          <li className="text-[10px] font-light tracking-[1px]">RISORSE</li>
          <li className="text-[10px] font-light tracking-[1px]">CONTATTI</li>
          <li className="rounded-tl-lg bg-[#2B3A54] px-4 py-2 text-[10px] font-light tracking-[1px] text-white">
            CHI SONO
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
