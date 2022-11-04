import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "./Form";
import APIService from "./APIService";

export default function ItemAccordion(props) {
  return (
    // Add defaultActiveKey="0" here to make them open on load
    <Accordion className="item-box">
      <Accordion.Item eventKey="0" className="">
        <Accordion.Header onClick={props.onClick}>
          {props.type}{props.showForm ? <span className="button-label ms-auto">👉 Click here to expand 👈</span> : null}
        </Accordion.Header>
        <Accordion.Body>
          <Table>
            <thead>
              <tr>
                <th>{props.type} Item</th>
                <th>Amount</th>
                <th></th>
                {/* <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {Object.keys(props.obj).map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item}</td>
                    <td>$ {props.obj[item]}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          APIService.DeleteItem(props.type, { item });
                          props.onDelete(props.type, { item });
                        }}
                        className=""
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {/* Trial Form */}
              {/* 
              <tr>
                <td>
                  <label className="form-label">Item</label>
                  <input className="form-control" placeholder="Input Bills Item"></input>
                </td>
                <td>
                <label className="form-label">Amount</label>
                  <input className="form-control" placeholder="Input Amount"></input>
                </td>
                <td>
                  <Button className="" variant="outline-success" >
                    ✓
                  </Button>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
