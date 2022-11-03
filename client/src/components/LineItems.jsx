import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function LineItems(props) {
  return (
    <Container className="">
      {Object.keys(props.obj).map((item, i) => {
        return (
          <p key={i}>
            {item}cost {props.obj[item]}
          </p>
        );
      })}
    </Container>
  );
}
