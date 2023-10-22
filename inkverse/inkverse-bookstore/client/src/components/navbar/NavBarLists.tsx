import { useState } from "react";
import Dot from "../../assets/dot.svg";

const NavBarLists = () => {
  const NavContents = [
    "Home",
    "Bestseller",
    " Category",
    "Find a book",
    "About",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <ul className="flex justify-center gap-3 font-mulish text-md text-[#727272]">
        {NavContents.map((content, index) => (
          <div key={index} className="flex flex-col items-center ">
            <li
              key={index}
              className={`cursor-pointer ${
                index === activeIndex
                  ? "text-[#237943] px-3 font-semibold"
                  : "px-3"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <p>{content}</p>
            </li>
            {index === activeIndex && (
              <img src={Dot} alt="dot" className="w-5 h-5" />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NavBarLists;
