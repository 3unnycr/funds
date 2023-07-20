import React from "react";

const CfdShow = (props) => {
  const rows = [];
  let amount = props.amount;
  let newamount = amount;
  let roi = newamount * 0.02;
  for (let i = 0; i < 12; i++) {
      roi = newamount * 0.02;
      rows.push(
        <tr key={i}>
          <td>{Number(newamount).toFixed(2)}</td>
          <td>2</td>
          <td>{Number(roi).toFixed(2)}</td>
          <td>{i + 1}</td>
        </tr>
      );
      newamount = newamount + roi;
  }
  return (
    <>
      {rows}
      <tr>
        <th colSpan={2}>
          Total Balance ($)<br/>
          After (12) Months
        </th>
        <th colSpan={2}>
          {Number(newamount).toFixed(2)}
        </th>
      </tr>
    </>
  )
}
export default CfdShow;
