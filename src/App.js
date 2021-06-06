import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

export default function App() {
  const [fileObject, setFileObject] = useState("");
  const [data, setData] = useState([]);
  // const hiddenFileInput = useRef(null);
  useEffect(() => {
    if (fileObject) {
      ExcelRenderer(fileObject, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          const modifyData = resp.rows?.slice(1)?.map((itm, index) => ({
            trDate: new Date(itm[0] * 1000)?.toUTCString() || "",
            // trDate: itm[0] || "",
            particulars: itm[1] || "",
            instrumentNo: itm[2] || "",
            debit: itm[3] || "",
            credit: itm[4] || "",
            balance: itm[5] || ""
          }));
          setData(modifyData);
          // resp?.rows?.map()
          // console.log(resp);
        }
      });
    }
  }, [fileObject]);
  return (
    <div className="App">
      <h1>Adding Excel file and convert Array</h1>

      <input
        type="file"
        onChange={(e) => {
          setFileObject(e.target.files[0]);
        }}
        // ref={hiddenFileInput}
        // style={{ display: "none" }}
        // accept='.csv, .ods, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      />
      <table
        className="table"
        // cellspacing='0'
        // width='100%'
      >
        {/* {data[0]?.map((item) => ( */}
        <thead>
          <tr>
            {/* {data[0]?.map((head) => (
              <th>{head}</th>
            ))} */}
            <th>Tr Date</th>
            <th>particulars </th>
            <th>Insurance No </th>
            <th>Devit Amount </th>
            <th>Credit Amount </th>
            <th> Amount </th>
          </tr>
        </thead>
        {/* ))} */}
        {data?.map((item) => (
          <tbody>
            <tr>
              <td>{item?.trDate}</td>
              <td>{item?.particulars}</td>
              <td>{item?.instrumentNo}</td>
              <td>{item?.debit}</td>
              <td>{item?.credit}</td>
              <td>{item?.balance}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
