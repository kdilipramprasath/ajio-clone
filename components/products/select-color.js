import React from "react";
import ColorRadio from "../ui/color-radio";

const SelectColor = ({ colors, currentColor, onColorChange }) => {
  return (
    <div className="text-center my-5">
      <div className="capitalize mb-3 text-sm text-gray-600">
        {currentColor}
      </div>
      <div className="flex justify-center items-center space-x-2">
        {Object.keys(colors).map((color) => (
          <ColorRadio
            key={color}
            value={color}
            color={colors[color]["color-code"]}
            name="color"
            onChange={onColorChange}
            currentColor={currentColor}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectColor;
