import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const server = "http://localhost:8001/";
export default function SignIn() {
  const checkData = (x) => {
    if (x === null || x === undefined || x === "") {
      return false;
    }
    return true;
  };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) && checkData(email) && checkData(wallet)) {
      window.location.href = "/profile";
    }
  });
  const login = async (evt) => {
    evt.preventDefault();
    console.log(email, pass);
    await fetch(`${server}readUser?email=${email}&password=${pass}`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.success) {
          console.log(data.data);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("wallet", data.data.wallet);
          setEmail("");
          setPass("");
          window.location.href = "/";
        } else {
          setError(true);
          console.log("login failed");
        }
      });
  };
  return (
    <div>
      <Header />
      <h1 style={styles.signInHere}>Sign In Here</h1>
      <form style={styles.formOnly} onSubmit={(evt) => login(evt)}>
        {error ? (
          <>
            <label style={{ color: "red", fontWeight: 800, fontSize: 20,fontFamily:'Arima' }}>
              Error : Incorrect Email or Password
            </label>
            <br />
          </>
        ) : (
          <></>
        )}
        <label style={styles.label}>Email:</label>
        <br />
        <input
          type="email"
          style={styles.input}
          onChange={(text) => setEmail(text.target.value)}
          placeholder="Enter your email address"
          value={email}
        />
        <br />
        <br />
        <label style={styles.label}>Password:</label>
        <br />
        <input
          type="password"
          style={styles.input}
          onChange={(text) => setPass(text.target.value)}
          placeholder="Enter password"
          value={pass}
        />
        <br />
        <br />
        <input type="submit" value="Submit" style={styles.submit} />
      </form>
    </div>
  );
}

const styles = {
  signInHere: {
    fontFamily: "Arima",
    backgroundColor: "#4CAF50",
    color: "black",
    padding: "12px 20px",
    margin: "15px 4px",
    textAlign: "center",
    borderRadius: "4px",
    display: "inline-block",
  },
  formOnly: {
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    padding: 20,
    margin: 20,
    fontFamily: "Arima",
  },
  input: {
    padding: "12px 20px",
    margin: "8 0",
    border: "1px solid #ccc",
    fontFamily: "Arima",
    borderRadius: "4px",
    width: "40%",
  },
  submit: {
    backgroundColor: "#4CAF50",
    color: "black",
    padding: "12px 20px",
    margin: "8px 0",
    cursor: "pointer",
    fontFamily: "verdana",
    borderRadius: "4px",
    border: 0,
  },
  label: {
    fontFamily: "Arima",
    fontSize: 15,
  },
};
