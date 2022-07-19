const server = "http://localhost:8001";
// const server = "/api";
export default function Holdings({
  sr,
  units,
  price,
  id,
  admin,
  sold,
}) {
    const removeHolding=async(id)=>{
        await fetch(`${server}/removeHoliding?id=${id}`).then(res=>res.json()).then(data=>{
            if(data.success){
                alert('Holding deleted');
                window.location.reload();
            }else{
                alert("Unable to delete holding");
            }
        }
        )
    }
  return (
    <tr style={{ fontSize: 15 }}>
      <td>{sr}</td>
      <td>{units}</td>
      <td>{price}</td>
      <td>
        {admin ? (
          <div className="badge bg-success">Approved</div>
        ) : (
          <div className="badge bg-warning">Pending</div>
        )}
      </td>
      <td>
        {sold ? (
          <div className="badge bg-success">Sold</div>
        ) : (
          <div className="badge bg-danger">Unsold</div>
        )}
      </td>
      <td>
        <button className="btn btn-danger" onClick={()=>removeHolding(id)}>X</button>
      </td>
    </tr>
  );
}
