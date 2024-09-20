import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="flex items-center border-[1.5px] bg-transparent px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "password"}
        className="text-sm w-full py-3 bg-transparent rounded outline-none mr-3"
      />

      {isShowPassword ? (
        <FaEye
          size={22}
          onClick={() => toggleShowPassword()}
          className="text-primary cursor-pointer"
        />
      ) : (
        <FaEyeSlash
          size={22}
          onClick={() => toggleShowPassword()}
          className="text-slate-400 cursor-pointer"
        />
      )}
    </div>
  );
};

export default PasswordInput;
