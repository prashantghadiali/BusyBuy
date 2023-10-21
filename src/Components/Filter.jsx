import React from 'react'
import './Filter.css'
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';

function Filter(props) {
  
  const {price, setPrice, category, setCategory} = props;

  const handleCheckboxChange = (event) => {
    const item = event.target.value;
    if (event.target.checked) {
      setCategory([...category, item]);
    } else {
      setCategory(category.filter((option) => option !== item));
    }
  };

  return (
    <>
        <Card className='filterComponet' >
            <Card.Body>
                <Card.Title className='center' >Filter</Card.Title>
                 {/* price ranger and price slider  */}
                <Card.Subtitle className="mb-2 text-muted center"><span>Price : </span>{price}</Card.Subtitle>
                <Card.Text>
                      {/* slider  */}
                      <Form.Range type="range" 
                          min="100" 
                          max="50000" 
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)} />
                </Card.Text>
                <Card.Title className='center' >Category</Card.Title>
                <Card.Text>
                     {/* men category */}
                    <Form.Check type="checkbox" 
                        id="men" 
                        value="men" 
                        name="category" 
                        label="Men's Clothing"
                        onChange={handleCheckboxChange}
                        />
                      {/* women category */}
                    <Form.Check type="checkbox" 
                        id="women" 
                        value="women" 
                        name="category" 
                        label="Women's Clothing"
                        onChange={handleCheckboxChange}
                        />
                      {/* jewellery category */}
                    <Form.Check type="checkbox" 
                        id="jewellery" 
                        value="jewellery" 
                        name="jewellery" 
                        label="Jewellery"
                        onChange={handleCheckboxChange}
                        />                  
                      {/* electronics category */}
                    <Form.Check type="checkbox" 
                        id="electronics" 
                        value="electronics" 
                        name="electronics" 
                        label="Electronics"
                        onChange={handleCheckboxChange}
                        />
                </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default Filter
