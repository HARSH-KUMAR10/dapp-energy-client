import React, { useState, useEffect } from "react";
import Header from "../components/Header";
const keys = require('../Keys')

export default function Wallet() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [wallet, setWallet] = useState("");
  const [newWallet, setNewWallet] = useState("");
  const [error, setError] = useState(false);
  const checkData = (x) => {
    if (x === null || x === undefined || x === "") {
      return false;
    }
    return true;
  };
  useEffect(() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) && checkData(email) && checkData(wallet)) {
      setId(id);
      setEmail(email);
      setWallet(wallet);
    } else {
      alert("You are not loggedIn, redirecting to LogIn Page");
      window.location.href = "signin";
    }
  }, []);
  const updateWallet = async (evt) => {
    evt.preventDefault();
    await fetch(
      `${keys.server}/updateWallet?wallet=${
        parseInt(wallet) + parseInt(newWallet)
      }&_id=${id}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        localStorage.setItem("wallet", parseInt(wallet) + parseInt(newWallet));
        if (data.success) {
          console.log(data.data);
          setWallet("");
          window.location.href = "/profile";
        } else {
          setError(true);
        }
      });
  };
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <h5>{email}</h5>
        <h5>Wallet : {wallet}$</h5>
      </div>
      <form style={styles.formOnly} onSubmit={(evt) => updateWallet(evt)}>
        {error ? (
          <>
            <label style={{ color: "red", fontWeight: 800, fontSize: 20 }}>
              Error : Wallet not updated
            </label>
            <br />
          </>
        ) : (
          <></>
        )}

        <label style={styles.label}>Add Money:</label>
        <br />
        <input
          type="text"
          name="wallet"
          style={styles.input}
          onChange={(text) => setNewWallet(text.target.value)}
          value={newWallet}
          placeholder="Add money to your wallet"
          size="40"
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
    display:'inline-block',
    fontWeight:'900',
  },
  formOnly: {
    borderRadius: "5px",
    backgroundColor: "#ccc",
    padding: 20,
    margin: '1% 5%',
  },
  input: {
    padding: "12px 20px",
    width: "50%",
    margin: "8 0",
    border: "1px solid #ccc",
    fontFamily: "Verdana",
    borderRadius: "4px",
  },
  submit: {
    backgroundColor: "#4CAF50",
    color: "black",
    padding: "12px 20px",
    width: "29%",
    margin: "8px 0",
    cursor: "pointer",
    fontFamily: "Arima",
    borderRadius: "4px",
    border:0
  },
  label: {
    fontFamily: "Arima",
    fontSize:13,
    fontWeight:'900'
  },
};
