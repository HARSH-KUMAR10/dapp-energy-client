import { useEffect, useState } from "react";
import Header from "../components/Header";
import Holdings from "../components/profile-components/Holdings";
import Transaction from "../components/profile-components/Transaction";
const keys = require("../Keys");

export default function Profile() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [wallet, setWallet] = useState("");
  const [form, setForm] = useState(false);
  const [newUnits, setNewUnits] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [error, setError] = useState(false);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const checkData = (x) => {
    if (x === null || x === undefined || x === "" || x.length === 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    async function run() {
      var id = localStorage.getItem("id");
      var email = localStorage.getItem("email");
      var wallet = localStorage.getItem("wallet");
      if (checkData(id) && checkData(email) && checkData(wallet)) {
        setId(id);
        setEmail(email);
        setWallet(wallet);

        await fetch(`${keys.server}/readTransacionByEmail?email=${email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setTransactions(data.data);
              console.log("transactions");
              console.table(data.data);
              setError(false);
            } else {
              setError(true);
            }
          });

        await fetch(`${keys.server}/readHoldingById?id=${id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setHoldings(data.data);
              console.log("holding");
              console.table(data.data);
              setError(false);
            } else {
              setError(true);
            }
          });
      } else {
        alert("You are not loggedIn, redirecting to LogIn Page");
        window.location.href = "signin";
      }
    }
    run();
  }, []);
  const openForm = () => {
    setForm(true);
  };
  const saveHolding = async () => {
    await fetch(
      `${keys.server}/createHolding?email=${email}&id=${id}&units=${newUnits}&price=${newPrice}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm(false);
          setError(false);
          fetch(`${keys.server}/readHoldingById?id=${id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setHoldings(data.data);
              console.log("holding");
              console.table(data.data);
              setError(false);
            } else {
              setError(true);
            }
          });
        } else {
          setError(true);
        }
      });
  };

  return (
    <>
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
        <form>
          <a href="/wallet" style={styles.submit}>
            Add Money (+)
          </a>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <h4 style={{ fontFamily: "Arima" }}>Your Holdings</h4>
        {form ? (
          <div style={{ fontFamily: "Arima" }}>
            <input
              type="text"
              placeholder="Enter Units"
              value={newUnits}
              onChange={(evt) => {
                setNewUnits(evt.target.value);
              }}
            />
            {"  "}
            <input
              type="text"
              placeholder="Enter price/unit"
              value={newPrice}
              onChange={(evt) => {
                setNewPrice(evt.target.value);
              }}
            />
            {"  "}
            <button
              onClick={() => {
                saveHolding();
              }}
              style={{ fontFamily: "Arima" }}
              className="btn btn-success"
            >
              +
            </button>
          </div>
        ) : (
          <button
            style={{ fontFamily: "Arima" }}
            className="btn btn-success"
            onClick={() => openForm()}
          >
            Add new holding +
          </button>
        )}
      </div>

      <div style={{ padding: "0% 10%" }}>
        {error ? (
          <>
            <label style={{ color: "red", fontWeight: 800, fontSize: 20 }}>
              Error: Not able to add holding, try again later
            </label>
            <br />
          </>
        ) : (
          <></>
        )}
        {holdings.length === 0 ? (
          <h5>
            Your current holding is empty, add new holding to sell electricity
          </h5>
        ) : (
          <>
            <table
              cellSpacing={0}
              cellPadding={10}
              style={{
                width: "100%",
                border: "1px solid black",
                fontFamily: "Arima",
              }}
            >
              <tr
                style={{
                  fontSize: 17,
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "900",
                }}
              >
                <td>Sr</td>
                <td>Units</td>
                <td>Price</td>
                <td>Total</td>
                <td>Admin</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
              {holdings.map((item, index) => (
                <Holdings
                  sr={index}
                  units={item.Units}
                  price={item.Price}
                  key={index}
                  id={item._id}
                  admin={item.AdminActive}
                  sold={item.Sold}
                />
              ))}
            </table>
          </>
        )}
      </div>
      <h4 style={{ fontFamily: "Arima", paddingTop: 40, paddingLeft: 20 }}>
        Transactions
      </h4>
      <div style={{ padding: "0% 10%" }}>
        {transactions.length === 0 ? (
          <h5>Your have no transactions, buy or sell energy units now.</h5>
        ) : (
          <>
            <table
              cellSpacing={0}
              cellPadding={10}
              style={{
                width: "100%",
                border: "1px solid black",
                fontFamily: "Arima",
              }}
            >
              <tr
                style={{
                  fontSize: 17,
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "900",
                }}
              >
                <td>From</td>
                <td>To</td>
                <td>Units</td>
                <td>Total</td>
              </tr>
              {transactions.map((item, index) =>
                item.From === email || item.To === email ? (
                  <Transaction
                    from={item.From}
                    to={item.To}
                    units={item.Units}
                    total={item.Total}
                    key={index}
                  />
                ) : (
                  <></>
                )
              )}
            </table>
          </>
        )}
        <br />
        <br />
      </div>
    </>
  );
}

const styles = {
  submit: {
    backgroundColor: "#4CAF50",
    color: "black",
    padding: 10,
    fontFamily: "Arima",
    borderRadius: 5,
    textDecoration: "none",
  },
};
