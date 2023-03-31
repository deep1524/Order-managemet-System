import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead, 
  Tr,
} from "@chakra-ui/react";
const Stock = () => {
  const [data, SetData] = useState([]);
  const [complete, SetComplete] = useState([]);
  const [input, SetInput] = useState([]);
  const [Category, setCategory] = useState("");
  const [Qty, setQty] = useState("");
  const [Price, setPrice] = useState("");
  const [item, setItem] = useState(true);
  let getdata = async () => {
    fetch("https://beautiful-jay-knickers.cyclic.app/orders")
      .then((response) => response.json())
      .then((data) => SetData(data));
  };
  let getcompletedata = async () => {
    fetch("https://beautiful-jay-knickers.cyclic.app/complete")
      .then((response) => response.json())
      .then((data) => SetComplete(data));
  };
 
  useEffect(() => {
    getdata();
    getcompletedata();
  }, [item]);
  function handleSubmit(event) {
    event.preventDefault();
    SetInput({ Category, Qty, Price });
  }

  useEffect(() => {
    check();
  }, [input]);

  function check() {
    console.log("Check", input);
    let x = false;
    data.filter(function (data) {
      console.log(data.Price, input.Price);
      if (data.Price === input.Price) {
        movetocomplete(input);
        handledelete(data._id);
      } else {
        x = true;
        console.log("check insise");
      }
    });
    if (x === true) {
      console.log("Check one");
      alert("stock not matching");
    }
  }

  // post complete
  const movetocomplete = (input) => {
    fetch("https://beautiful-jay-knickers.cyclic.app/complete", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {})
      .catch((err) => console.log(err));
  };

  const handledelete = (id) => {
    axios
      .delete(`https://beautiful-jay-knickers.cyclic.app/orders/${id}`, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setItem(!item);
        console.log(response);
      });
  };

  return (
    <>
    <Text style={{fontSize:"40px"}}>Order Matching system</Text>
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="teal"
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "40px",
            border: "2px solid black",
          }}
        >
          <Thead>
            <Tr>
              <th
                colSpan={"4"}
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Pending Table
              </th>
            </Tr>
            <Tr>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Qty</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((order, index) => (
              <Tr key={index}>
                <Td>{order.Category}</Td>
                <Td>{order.Price}</Td>
                <Td>{order.Qty}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
      {/* form */}

      <FormControl
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "40px",
          border: "1px solid black",
        }}
      >
        <Text style={{ fontSize: "40px" }}> Form</Text>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Select category"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Buyer</option>
          <option>Seller</option>
        </Select>
        <FormLabel>Qty</FormLabel>
        <Input
          type="number"
          value={Qty}
          placeholder="enter your Qty"
          onChange={(e) => setQty(+e.target.value)}
        />
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          value={Price}
          placeholder="enter your Price"
          onChange={(e) => setPrice(+e.target.value)}
        />
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={handleSubmit}
          mb={4}
          p={5}
        >
          Add
        </Button>
      </FormControl>
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="teal"
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "40px",
            border: "2px solid black",
          }}
        >
          <Thead>
            <Tr>
              <th
                colSpan={"4"}
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Complete Table
              </th>
            </Tr>
            <Tr>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Qty</Th>
            </Tr>
          </Thead>

          <Tbody>
            {complete.map((order, index) => (
              <Tr key={index}>
                <Td>{order.Category}</Td>
                <Td>{order.Price}</Td>
                <Td>{order.Qty}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default Stock;
