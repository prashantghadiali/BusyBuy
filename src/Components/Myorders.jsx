import React, { useEffect, useState } from 'react'
import NavbarComp from './NavbarComp'
import { useCart } from './Contexts/CartContext';
import { db } from '../firebaseInit';
import { collection, getDocs } from 'firebase/firestore';
import { Col, Container, Row, Table } from 'react-bootstrap';

function Myorders() {
  const { cart } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersCollection);

        const fetchedOrders = [];
        ordersSnapshot.forEach((doc) => {
          fetchedOrders.push(doc.data());
        });

        setOrders(fetchedOrders);
        console.log("fetched orders :", fetchOrders);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders);
  return (
    <div>
      <NavbarComp />
      <Container>
      <h2 className='m-5'>Purchase History</h2>
      {orders.map((order, index) => (
        <div key={index}>
          <h4>Purchase {index + 1}</h4>
          {/* Display other order details */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Item</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orditem.map((ord, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ord.name}</td>
                  <td>{ord.category}</td>
                  <td>{ord.quantity}</td>
                  <td>&#8377;{ord.price*ord.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row style={{display: "flex", justifyContent: "flex-end"}}>
            <Col xs={2} style={{background: "#f2f2f2", marginTop: -15, borderRadius: 5, width: 200}}>
              <h6>Total Price: &#8377;{order.total}</h6>
            </Col>
          </Row>
        </div>
      ))}
      </Container>
    </div>
  )
}

export default Myorders
