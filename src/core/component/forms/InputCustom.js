import { useState } from "react";
import { Form } from "react-bootstrap";

const InputCustom = ({ label, type, onChange, check, ...other }) => {
  const [isValid, setIsValid] = useState(false);
  let regEx = "";

  if (type == "email")
    regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  else
    regEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleInputChange = (ev) => {
    if (regEx.test(ev.target.value)) {
      setIsValid(true);
      onChange(ev);
      check(true);
    } else {
      check(false);
      setIsValid(false);
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...other}
        className={!isValid && "input-error"}
        onChange={handleInputChange}
      />
      {isValid === false && (
        <p style={{ color: "red" }}>Format du mail invalide.</p>
      )}
    </Form.Group>
  );
};

export default InputCustom;
