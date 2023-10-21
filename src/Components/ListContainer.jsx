import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap';
import { CartContext } from './Contexts/CartContext';
import { useAuth } from './Contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ListContainer(props) {
    const {prod} = props;
    const { addToCart } = useContext(CartContext);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = async (item) => {
      if (currentUser) {
        await addToCart(item);
        toast.success(`${item.name} is Added to Cart`)
        console.log("cart", item);
      } else {
        navigate('/signin')
      }
    };
  return (
    <div>
        <Card className='listCard'>
            <Card.Img variant="top" className='listImg' src={prod.url} />
            <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                <Card.Text>
                    Price : &#8377; {prod.price}
                </Card.Text>
                <Card.Text>
                    Category : {prod.category}
                </Card.Text>
                <Button onClick={() => handleAddToCart(prod)} className='productBtn'>Add to Cart</Button>
            </Card.Body>
        </Card>          
    </div>
  )
}

export default ListContainer
