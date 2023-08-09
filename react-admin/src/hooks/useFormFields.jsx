import { useState } from "react";

const useFormFields = (inicialState) => {
  const [input, setInput] = useState(inicialState);

  //handle input change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setInput(inicialState);
  };
  return { input, handleChange, resetForm, setInput };
};

export default useFormFields;
