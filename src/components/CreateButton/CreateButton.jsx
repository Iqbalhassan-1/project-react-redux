import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import style from "./createbutton.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import { Button } from "react-bootstrap";
const CreateButton = ({
  title,
  onClick,
  icon,
  background,
  color,
  border,
  icon1,
  type,
  disabled,
  width,
}) => {
  const buttonStyle = {
    background: background,
    color: color,
    border: border,
    // width: width,
  };
  return (
    <Button
      className={`${style.createbutton} ${disabled ? style.disabled : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
    >
      {icon && (
        <span className={style.addicons}>
          <MdOutlineAdd size={23} />
        </span>
      )}
      {icon1 && (
        <span className={style.addicons}>
          <RiFileExcel2Line size={20} />
        </span>
      )}

      {title}
    </Button>
  );
};

export default CreateButton;
