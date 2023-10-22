import { Button } from "@material-tailwind/react";
import offlineSvg from "../assets/offline.svg";

const Offline = () => {
    const refresh = () => window.location.reload()
  return (
    <div className="flex justify-center items-center h-[80vh] flex-col ">
      <div>
        <img src={offlineSvg} alt="offline picture" className="w-16 h-16" />
      </div>
      <div className="w-8/12 flex flex-col items-center gap-5 font-mulish">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-bold ">You are currently offline</p>
          <p className="w-5/12 text-center text-sm">
            We can't show you this image because you aren't connected to the
            internet. When you're back online refresh the page or hit the button
            below
          </p>
        </div>
        <Button onClick={refresh} className=" bg-[#237943] mb-4 font-mulish text-sm">
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Offline;
