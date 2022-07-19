export default function Transaction({ from, to, units, total }) {
  return (
    <tr style={{ fontSize: 15 }}>
      <td>{from}</td>
      <td>{to}</td>
      <td>{units}</td>
      <td>{total}</td>
    </tr>
  );
}
