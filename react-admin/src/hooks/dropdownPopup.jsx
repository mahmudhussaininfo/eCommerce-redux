import React, { useEffect, useRef, useState } from "react";

export const dropdownPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  //toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return { isOpen, toggleMenu, dropDownRef };
};
