import React from "react";

interface ButtonProps {
  label: string;
  bgColor: string;
  hoverBgColor: string;
  hoverTransform?: string;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-5 bg-white pt-7 px-4 pb-5 justify-center">
      <div className="flex flex-wrap gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`bg-${button.bgColor} hover:bg-${button.hoverBgColor} text-white text-sm py-2.5 px-5 rounded-xl shadow-md ${button.hoverTransform || "hover:translate-y-[-2px]"} transition duration-300`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
