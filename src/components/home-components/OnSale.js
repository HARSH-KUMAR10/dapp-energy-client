import { useState, useEffect } from "react";
export default function OnSale({ name, units, price }) {
  const checkData = (x) => {
    if (x === null || x === undefined || x === "") {
      return false;
    }
    return true;
  };
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) && checkData(email) && checkData(wallet)) {
      setEmail(email);
      setId(id);
      setWallet(wallet);
    } else {
      console.log("not logged in");
      // alert('Not logged In, Login first.');
      // window.location.href="/signin";
    }
  }, [id, wallet, email]);

  const server = "http://localhost:8001/";
  const buy = async (units, price) => {
    console.log(wallet, units * price);
    if (wallet < units * price) {
      setError(true);
    } else {
      var choice = window.confirm(
        `Hi ${email}!\nYour wallet has:${wallet}.\nYour total buying:${
          units * price
        }\nYour wallet will have:${
          wallet - units * price
        }\n\nDo you want to continue ?`
      );
      if (choice) {
        await fetch(
          `${server}createTransaction?from=${name}&to=${email}&units=${units}&total=${
            units * price
          }`
        )
          .then((res) => res.json())
          .then(async (data) => {
            if (data.success) {
              console.log("transaction complete");
              await fetch(
                `${server}updateWallet?wallet=${
                  parseInt(wallet) - parseInt(units * price)
                }&_id=${id}`
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.success) {
                    localStorage.setItem(
                      "wallet",
                      parseInt(wallet) - parseInt(units * price)
                    );
                    setWallet(parseInt(wallet) - parseInt(units * price));
                    window.location.reload();
                  }
                });
            } else {
              console.log("transaction declined");
            }
          });
      } else {
        alert("Transaction declined");
      }
    }
  };
  return (
    <div style={styles.contianer}>
      {error ? (
        <>
          <label style={{ color: "red", fontWeight: 800, fontSize: 15,fontFamily:'Arima' }}>
            Error: Not enough money available in the wallet.
          </label>
          <br />
        </>
      ) : (
        <></>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h5>Seller : {name}</h5>
        <button
          style={{
            backgroundColor: "#2962ff",
            color: "white",
            padding: 5,
            border: "0px",
          }}
          onClick={() => buy(units, price)}
        >
          Buy
        </button>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          fontFamily:'Arima'
        }}
      >
        <h6>Units: {units}</h6>
        <h6>Price/Unit: {price}</h6>
        <h6>Total Cost: {units*price}</h6>
      </div>
    </div>
  );
}

const styles = {
  contianer: {
    display: "inline-block",
    border: "1px solid gray",
    width: "45%",
    padding: 20,
    fontFamily: "Arima",
    margin: 10,
    borderRadius: "4px",
  },
};
