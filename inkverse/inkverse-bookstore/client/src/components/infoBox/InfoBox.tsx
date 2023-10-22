import React from "react";

interface InfoBoxProps {
  title: string;
  message: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, message }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default InfoBox;
