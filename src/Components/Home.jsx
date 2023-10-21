import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Filter from './Filter';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { db } from '../firebaseInit';
import { uploadData } from './Upload';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import ListContainer from './ListContainer';
import NavbarComp from './NavbarComp';
import { useAuth } from './Contexts/AuthContexts';
import './Product.css'


function Home() {
    // loading status by default true
    const [isLoading, setLoading]=useState(true);

    // to filter item on the basis of price and item category
    const [price,setPrice]=useState(5000);
    const [category,setCategory]=useState([]);
    const [product, setProduct] = useState([]);

    // for searched item
    const [search, setSearch]=useState('');
    
    // for authentication
    const { currentUser } = useAuth();
  // console.log("user :", currentUser.email);

    // get data from firebase
    const getData = async () => {
        // change this to retrive expenses from firestore in realtime
        const unsub = onSnapshot(collection(db, "product"), (snapshot) => {
          const getproduct = snapshot.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data()
          }));
        //   console.log("product :", getproduct);
          setProduct(getproduct)
          setLoading(false);   // when product is available loader
        });
      };
    
      // use this once to set up data and comment out
      // useEffect(() => {
      //   uploadData();
      // }, []);
      
      useEffect(() => {
        getData();
      }, []);
      console.log("log prod", product);

    function filteredProducts() {
      let newProducts = [...product];
      if (price) {
        newProducts = newProducts.filter((el)=> Number(el.price) <= price)
      }
      if (category.length > 0) {
        let temp = category.map((el)=> {
            let tempProd = newProducts.filter((cat) => cat.category === el);
            return tempProd
        })
        newProducts = temp.flat()
      }
      if (search) {
        newProducts = newProducts.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
      }
      return newProducts
    }
      
  return (
      <div>
      {isLoading && currentUser ? <Loader /> :
        <>
        <NavbarComp />
        <Filter price={price} setPrice={setPrice} category={category} setCategory={setCategory} />
        <br />
        {/* searchbar */}
        <Form.Control type="text" placeholder="Search by Name" value={search} onChange={(e) => setSearch(e.target.value)} style={{width: "70%", margin: "auto"}} />
        {/* Example of reading data from Firestore */}
        <div>  
            <Container className='productCard'>
                    <Row>                        
                        {filteredProducts().map((prod, index) => {
                            return(<Col xs={3} key={index} style={{margin: 30, width: 250}}><ListContainer prod={prod} /></Col>)
                        })}
                    </Row>
            </Container>
        </div>
      </>
    }
    </div>
  )
}

export default Home
