import { Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../core/component/contexts/AuthContext";
import { useNavigate } from "react-router";
import InputCustom from "../../core/component/forms/InputCustom";

const Login = () => {
  const [userLog, setUserLog] = useState({ email: "", password: "" });
  const [user, setUser] = useContext(UserContext);
  const [validated, setValidated] = useState(false);
  const [validatedTwo, setValidatedTwo] = useState(false);
  const navigate = useNavigate();

  const submit = (ev) => {
    if (validated == false || validatedTwo == false) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      ev.preventDefault();
      //api call to server return user, which i create artificially below
      let u = { lastname: "Bertrac", firstname: "Nathan", mail: userLog.email };
      setUser(u);
      sessionStorage.setItem("USER", JSON.stringify(u));
      navigate("/");
    }
  };

  const changeFormField = (ev) => {
    const obj = { ...userLog };
    obj[ev.target.name] = ev.target.value;
    setUserLog(obj);
  };

  return (
    <div>
      <h1>Connexion</h1>
      <Form noValidate validated={validated} onSubmit={submit}>
        <InputCustom
          label="Email"
          type="email"
          placeholder="Votre email"
          onChange={changeFormField}
          check={setValidated}
          name="email"
        />
        <InputCustom
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          onChange={changeFormField}
          check={setValidatedTwo}
          name="password"
        />
        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </Form>
    </div>
  );
};
export default Login;
