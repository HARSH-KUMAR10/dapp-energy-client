import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const server = "http://localhost:8001";
// const server = "/api";
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
      `${server}/updateWallet?wallet=${
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
        <h4>{email}</h4>
        <h4>Wallet : {wallet}$</h4>
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
  formOnly: {
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    padding: 20,
    margin: "20px 5px",
  },
  input: {
    padding: "12px 20px",
    width: "50%",
    margin: "8 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "Verdana",
  },
  submit: {
    backgroundColor: "#4CAF50",
    color: "black",
    padding: "12px 20px",
    width: "29%",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "Verdana",
  },
  label: {
    fontFamily: "Times new Roman",
  },
};
