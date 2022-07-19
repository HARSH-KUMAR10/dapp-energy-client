export default function Transaction({ from, to, units, total }) {
  return (
    <tr style={{ fontSize: 13 }}>
      <td style={{fontFamily: "Arima"}}>{from}</td>
      <td style={{fontFamily: "Arima"}}>{to}</td>
      <td style={{fontFamily: "Arima"}}>{units}</td>
      <td style={{fontFamily: "Arima"}}>{total}</td>
    </tr>
  );
}
