import React from "react";

interface ClickableTextProps {
  label: string;
  onClick: () => void;
}

const ClickableText: React.FC<ClickableTextProps> = ({ label, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="text-purple-500 text-base font-normal leading-5 tracking-wider cursor-pointer focus:outline-none"
      >
        {label}
      </button>
    </div>
  );
};

export default ClickableText;
