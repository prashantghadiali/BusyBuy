import React, { useEffect } from 'react'
import NavbarComp from './NavbarComp'
import { Button, Container, Table } from 'react-bootstrap';
import { useCart } from './Contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

function Cart() {
  const {cart, placeOrder, fetchSpecificUserData, total, cartLength, increaseQuantityByOne, decreaseQuantityByOne} = useCart()
  const navigate = useNavigate();
    useEffect(() => {
      fetchSpecificUserData();
    },[]);
  // get docs // filter

  const handleOrder = () => {
    placeOrder()
    navigate('/myorders')
    toast.success("Order Placed !")
    console.log("order placed");
  }


  return (
    <div>
      <NavbarComp />
      {cartLength !== 0 ?  
      <>
      <Container>
        <h2>Cart</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Quantity Actions</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button variant="success" onClick={() => item.id && increaseQuantityByOne(item.id)}><FontAwesomeIcon icon={faPlus} /></Button>{' '}
                  <Button variant="danger" onClick={() => item.id && decreaseQuantityByOne(item.id)}><FontAwesomeIcon icon={faMinus} /></Button>
                </td>
                <td> &#8377; {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <h2>Total Quantity: {cart.items.reduce((acc, item) => acc + item.quantity, 0)}</h2>  */}
        <h2>Total Amount: &#8377; {total}</h2>
        <button onClick={() => handleOrder(cart, total)}>Purchase</button>
        
        </Container>
      </>
      :
      <h1>Cart is Empty</h1> 
      }
    </div>
  )
}

export default Cart
