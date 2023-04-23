import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Landing = () => {
  const [active, setActivate] = useState(false);
  return (
    <div className="bg-black flex flex-col min-h-screen">
      <div className="hidden lg:flex px-6 relative py-3 justify-between before:absolute before:contents-[''] before:bg-gradient-to-r before:h-60 before:w-60 before:rounded-full before:from-red-900/50 before:blur-[90px]">
        <div className="text-white font-bold uppercase text-3xl newFont">
          Medico
        </div>
        <div>
          <ul className="flex text-white gap-6">
            <li className="cursor-pointer">
              <a>Home</a>
            </li>
            <li className="cursor-pointer">
              <a>About</a>
            </li>
            <li className="cursor-pointer">
              <a>Treatment</a>
            </li>
            <li className="cursor-pointer">
              <a>Contact us</a>
            </li>
          </ul>
        </div>
        <button className="border text-white rounded px-[2%] py-2">
          Store
        </button>
        <button className="lg:hidden" onClick={() => setActivate(true)}>
          <RxHamburgerMenu className="text-white text-3xl" />
        </button>
      </div>
      <div className="flex lg:hidden px-6 relative py-3 transition-all duration-1000 justify-between before:absolute before:contents-[''] before:bg-gradient-to-r before:h-60 before:w-60 before:rounded-full before:from-red-900/50 before:blur-[90px]">
        <div className="text-white font-bold uppercase text-3xl newFont">
          Medico
        </div>
        <button onClick={() => setActivate(true)}>
          <RxHamburgerMenu className="text-white text-3xl" />
        </button>
      </div>
      <div
        className={`bg-black absolute transition-all flex duration-200 ${
          active ? "w-full" : " w-0"
        } z-50 h-full lg:hidden flex-col justify-between before:absolute before:contents-[''] before:bg-gradient-to-r before:h-60 before:w-60 before:rounded-full before:from-red-900/50 before:blur-[90px]`}
      >
        <div
          className={`text-white relative py-10 newFont ${
            active ? "flex" : "hidden"
          }`}
        >
          <h1 className="font-bold uppercase text-8xl mx-auto"> Medico</h1>
          <AiOutlineClose
            className="cursor-pointer text-neutral-700 text-4xl absolute top-4 right-4"
            onClick={() => setActivate(false)}
          />
        </div>
        <div className="h-full overflow-hidden">
          <div className="before:absolute before:contents-['']  before:bg-gradient-to-r before:h-60 before:w-60 before:rounded-full before:from-blue-700 before:blur-[90px]">
            <ul className="flex flex-col text-white ">
              <li className="cursor-pointer py-4 text-2xl hover:bg-neutral-900 flex justify-center items-center">
                <a>Home</a>
              </li>
              <li className="cursor-pointer py-4 text-2xl hover:bg-neutral-900  flex justify-center items-center">
                <a>About</a>
              </li>
              <li className="cursor-pointer py-4 text-2xl hover:bg-neutral-900  flex justify-center items-center">
                <a>Treatment</a>
              </li>
              <li className="cursor-pointer py-4 text-2xl hover:bg-neutral-900  flex justify-center items-center">
                <a>Contact us</a>
              </li>
            </ul>
          </div>
          <button className="border before:absolute before:contents-[''] before:bg-gradient-to-r before:h-60 before:w-60 before:rounded-full before:from-blue-700 before:to-red-600 before:blur-[90px] mt-8 w-full font-extrabold text-4xl text-white border-neutral-900 hover:bg-neutral-900 rounded py-4">
            Store
          </button>
        </div>
      </div>
      <div className="relative flex px-4 w-full my-auto justify-around before:absolute before:hidden before:lg:block before:contents-[''] before:bg-gradient-to-r before:h-96 before:w-96 before:rounded-full before:from-blue-700 before:blur-[90px]">
        <div className="flex flex-col justify-center">
          <div className="text-white flex flex-col gap-8">
            <p className="text-orange-500 font-bold">Welcome</p>
            <h1 className="font-bold text-blue-500 text-5xl">
              Meet the Best Hospital
            </h1>
            <p>Overcome any hurdle or any other problem</p>
            <div className="flex gap-2">
              <Link
                hrefLang="en"
                to={"/dl"}
                className="flex-1 text-center py-3 rounded bg-blue-500"
              >
                <button>DL</button>
              </Link>
              <Link
                hrefLang="en"
                to={"/ml"}
                className="border text-center flex-1 py-2 rounded border-blue-500 text-blue-500 hover:bg-blue-500 hover:bg-opacity-25"
              >
                <button>ML</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="doctor.svg" alt="loading..." />
        </div>
      </div>
    </div>
  );
};

export default Landing;
