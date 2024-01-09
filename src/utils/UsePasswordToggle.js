import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const UsePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const Icon = (
    <div
      onClick={() => setVisible((visible) => !visible)}
      className="iconpassword"
    >
      {" "}
      {visible ? <BsEye /> : <BsEyeSlash />}
    </div>
  );

  const InputType = visible ? "text" : "password";
  return [InputType, Icon];
};

export default UsePasswordToggle;
