import { Typography } from "@material-tailwind/react";
import { SubscribeForm } from "./Input_Button";
import Logo from "../../assets/inkverselogo.svg";

const LINKS = [
  {
    title: "Category",
    items: ["Fiction", "Non-fiction", "Novel", "Classic"],
  },
  {
    title: "Company",
    items: ["About Us", "Contact Us", "Privacy & Policy", "Payment Method"],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full border-t py-5 border-blue-gray-50">
      <div className="flex flex-col w-full items-center justify-between">
        <div className="grid md:grid-cols-3 justify-between gap-4">
          <div className="flex justify-start gap-2 ">
            <img src={Logo} alt="inkverse_logo" className="w-10 h-10" />
            <h1 className="font-bold text-lg pt-2">InkVerse</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 ">
            {LINKS.map(({ title, items }) => (
              <ul key={title} className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link} >
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className=" ">
            <ul className="flex flex-col  items-center md:items-start w-full md:w-auto">
              <li className="text-start">
                <SubscribeForm />
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/">InkVerse</a>. All Rights
            Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
