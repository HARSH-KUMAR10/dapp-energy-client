import { useState, useEffect } from "react";
import Gun from "gun/gun";
const keys = require('../../Keys');

const gun = Gun({
  peers: [`${keys.server}/gun`],
});

export default function OnSale({ name, units, price, _id }) {
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
  // const [state,dispatch] = useReducer(reducer,initialState);
  useEffect(() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) && checkData(email) && checkData(wallet)) {
      setEmail(email);
      setId(id);
      setWallet(wallet);
    } // else {
    //   // console.log("not logged in");
    //   alert("Not logged In, Login first.");
    //   window.location.href = "/signin";
    // }
  }, [id, wallet, email]);

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
          `${keys.server}/createTransaction?from=${name}&to=${email}&units=${units}&total=${
            units * price
          }&id=${_id}`
        )
          .then((res) => res.json())
          .then(async (data) => {
            if (data.success) {
              //Gun JS
              const transactions = gun.get("energy_share_dapp");
              var current_datetime = new Date();
              transactions.set(
                {
                  from: name,
                  to: email,
                  units: units,
                  total: units * price,
                  createdAt:
                    current_datetime.getDate() +
                    "/" +
                    (current_datetime.getMonth() + 1) +
                    "/"+
                    current_datetime.getFullYear() +
                    "@" +
                    current_datetime.getHours() +
                    ":" +
                    current_datetime.getMinutes() +
                    ":" +
                    current_datetime.getSeconds(),
                },
                (result) => {
                  console.log(result);
                  
                }
              );
              //Gun JS
              await fetch(
                `${keys.server}/updateWallet?wallet=${
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
                    alert("transaction complete");
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
    <div className="col-md-5 col-12" style={styles.contianer} key={Math.floor(Math.random() * 100000)}>
      {error ? (
        <>
          <label style={{ color: "red", fontWeight: 800, fontSize: 20 }}>
            Error: Not enough money available in the wallet.
          </label>
          <br />
        </>
      ) : (
        <></>
      )}
      <div className="row">
        <h5 className="col-10" style={{fontWeight:'900'}}>Seller : {name}</h5>
        <button
          style={{
            backgroundColor: "#2962ff",
            color: "white",
            padding: 5,
            border: "0px",
          }}
          className="col-2"
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
    border: "1px solid gray",
    padding: 20,
    fontFamily: "Arima",
    borderRadius: 5,
    margin:5
  },
};
