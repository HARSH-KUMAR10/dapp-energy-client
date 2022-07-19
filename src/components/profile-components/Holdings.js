export default function Holdings({ sr, units, price }) {
  return (
    <tr style={{ fontSize: 13 }}>
        <td></td>
      <td style={{ fontFamily: "Arima" }}>{sr}</td>
      <td style={{ fontFamily: "Arima" }}>{units}</td>
      <td style={{ fontFamily: "Arima" }}>{price}</td>
      <td>
        <button
          style={{
            border: 0,
            fontFamily: "verdana",
            backgroundColor: "#f77",
            color: "white",
            fontWeight: "900",
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
}