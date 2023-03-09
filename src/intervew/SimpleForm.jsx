import { TextField } from "@mui/material";
import React, { useState } from "react";

function SimpleForm() {
  const [inputField, setInputField] = useState({
    firstname: "",
    lastname: "",
    gmail: "",
  });

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const submitButton = () => {
    console.log(inputField.firstname);
    alert(inputField.firstname);
  };
  console.log(inputField);

  return (
    <div>
      <form onSubmit={submitButton}>
        <TextField
          type="text"
          name="firstname"
          onChange={inputsHandler}
          placeholder="First Name"
          value={inputField.firstname}
        />

        <br />

        <TextField
          type="text"
          name="lastname"
          onChange={inputsHandler}
          placeholder="First Name"
          value={inputField.lastname}
        />

        <br />

        <TextField
          type="email"
          name="gmail"
          onChange={inputsHandler}
          placeholder="Gmail"
          value={inputField.gmail}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SimpleForm;
