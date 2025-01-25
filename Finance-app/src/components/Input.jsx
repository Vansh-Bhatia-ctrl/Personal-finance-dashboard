import React from "react";

const Input = ({ onChange, inputValue, ...props }) => {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
