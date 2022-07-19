import { useEffect, useState } from "react";
import Header from "../components/Header";
import Holdings from "../components/profile-components/Holdings";
import Transaction from "../components/profile-components/Transaction";
const keys = require('../Keys');

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
    if (x === null || x === undefined || x === "") {
      return false;
    }
    return true;
  };
  useEffect(async () => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) && checkData(email) && checkData(wallet)) {
      setId(id);
      setEmail(email);
      setWallet(wallet);
      await getTransactions();
      await getHoldings();
    } else {
      window.location.href = "signin";
    }
  }, [id, wallet, email]);
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
          getHoldings();
        } else {
          setError(true);
        }
      });
  };
  const getHoldings = async () => {
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
  };
  const getTransactions = async () => {
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
  };
  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          fontFamily:'Arima'
        }}
      >
        <h4 style={{fontFamily:'Arima'}}>{email}</h4>
        <h4 style={{fontFamily:'Arima'}}>Wallet : {wallet}$</h4>
        <form style={styles.submit}>
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
        <h3 style={{ fontFamily: "Arima" }}>Your Holdings</h3>
        {form ? (
          <div>
            <input
              type="text"
              placeholder="Enter Units"
              value={newUnits}
              onChange={(evt) => {
                setNewUnits(evt.target.value);
              }}
              style={{
                borderRadius: 5,
                fontFamily: "Arima",
                padding: 10,
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
              style={{
                borderRadius: 5,
                fontFamily: "Arima",
                padding: 10,
              }}
            />
            {"  "}
            <button
            style={{
                borderRadius: 5,
                fontFamily: "Arima",
                padding: 10,
                backgroundColor: "yellowgreen",
                border: 0,
              }}
              onClick={() => {
                saveHolding();
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            style={{
              borderRadius: 5,
              fontFamily: "Arima",
              padding: 10,
              backgroundColor: "yellowgreen",
              border: 0,
            }}
            onClick={() => openForm()}
          >
            Add new holding +
          </button>
        )}
      </div>

      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        {error ? (
          <>
            <label
              style={{
                color: "red",
                fontWeight: 800,
                fontSize: 15,
                fontFamily: "Arima",
              }}
            >
              Error: Not able to add holding, try again later
            </label>
            <br />
          </>
        ) : (
          <></>
        )}
        {holdings.length === 0 ? (
          <h2>
            Your current holding is empty, add new holding to sell electricity
          </h2>
        ) : (
          <>
            <table
              cellSpacing={0}
              cellPadding={5}
              style={{ width: "100%", border: "1px solid black",fontFamily:'Arima',borderRadius:5 }}
            >
              <tr
                style={{
                  fontSize: 18,
                  backgroundColor: "blue",
                  color: "white",
                  fontFamily:'Arima'
                }}
              >
                <td></td>
                <td style={{fontFamily:'Arima'}}>Sr</td>
                <td style={{fontFamily:'Arima'}}>Units</td>
                <td style={{fontFamily:'Arima'}}>Price</td>
                <td style={{fontFamily:'Arima'}}>Action</td>
              </tr>
              {holdings.map((item, index) => (
                <Holdings
                  sr={index}
                  units={item.Units}
                  price={item.Price}
                  key={index}
                />
              ))}
            </table>
          </>
        )}
      </div>
      <h3 style={{ fontFamily: "Arima", padding: 20 }}>Transactions</h3>
      <div style={{ paddingLeft: 20, paddingRight: 20,fontFamily: "Arima" }}>
        {transactions.length === 0 ? (
          <h4>Your have no transactions, buy or sell energy units now.</h4>
        ) : (
          <>
            <table
              cellSpacing={0}
              cellPadding={10}
              style={{ width: "100%", border: "1px solid black" }}
            >
              <tr
                style={{
                  fontSize: 18,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                <td style={{fontFamily: "Arima"}}>From</td>
                <td style={{fontFamily: "Arima"}}>To</td>
                <td style={{fontFamily: "Arima"}}>Units</td>
                <td style={{fontFamily: "Arima"}}>Price</td>
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
    padding: "3px",
    margin: "1px",
    fontFamily: "Arima",
    borderRadius: "4px",
    textDecoration: "none",
  },
};
