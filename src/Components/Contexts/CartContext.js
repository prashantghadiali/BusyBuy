import React, { createContext, useContext, useState } from 'react';
import { db } from '../../firebaseInit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useAuth } from './AuthContexts';

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext)
}


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartLength, setCartLength] = useState(0);
  const [userData, setUserData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [itemInCart, setItemInCart] = useState(0);
    // for authentication
    const { currentUser } = useAuth();
    const productRef = collection(db, 'product');
    const cartRef = collection(db, 'cart');


    
    const addToCart = async (item) => {
      // Example of adding a document with an automatically generated ID
      const q = query(cartRef, where('user', '==', currentUser.email), where('id', '==', item.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
      // collection ref, product, cart 
            addDoc(cartRef, {
                    user: currentUser.email,
                    category: item.category,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    url: item.url,
                    quantity: 1
                })
            .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
            .catch((error) => {
                    console.error("Error adding document: ", error);
                });
              } else {
                // If the item already exists in the cart, update its quantity
                querySnapshot.forEach((docu) => {
                    const currentQuantity = docu.data().quantity;
                    const docRef = doc(db, 'cart', docu.id); 
                    updateDoc(docRef, {
                        quantity: currentQuantity + 1
                    })
                    .then(() => {
                        console.log("Document quantity updated successfully: ", docu.id);
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
                });
            }    

                        //# for setting up the data setDoc for initial run  #//

                        // const productRef = doc(db, 'cart', '6'); // Assuming '6' is the document ID
                        //     setDoc(productRef, {
                        //         category: "women",
                        //         name: "Vans Old Skool",
                        //         price: 2199,
                        //         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHN8HCkMgzj9FVQMu-ObftZv88opd1-psa0A&usqp=CAU"
                        //     }, { merge: true })
                        //     .then(() => {
                        //         console.log("Document successfully written!");
                        //     })
                        //     .catch((error) => {
                        //         console.error("Error writing document: ", error);
                        //     });
  }

  // fetching cart data with user...
  const fetchSpecificUserData = async () => {
    const q = query(cartRef, where("user", "==", currentUser.email)); 
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => doc.data());
      setCart(data);
      console.log("user data,", data);

    // // total amount of products in cart
    const prices = data.map((item) => Number(item.price * item.quantity));
    const totalPrice = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setTotal(totalPrice);
    setCartLength(prices.length);
  };

// Function to increase the quantity by 1 for a specific document
const increaseQuantityByOne = async (documentId) => {
  try {
    const cartRef = collection(db, 'cart');
    const q = query(cartRef, where('user', '==', currentUser.email)); 
    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot", querySnapshot);

    querySnapshot.forEach(async (docu) => {
      if (docu.data().id === documentId) {
        const currentQuantity = docu.data().quantity;
   
        const newQuantity = currentQuantity + 1; // Increment the current quantity by 1

        const docRef = doc(db, 'cart', docu.id); 
    
        await updateDoc(docRef, {
          quantity: newQuantity
        });
        
        console.log(docu.data().quantity);
      }
      console.log('Quantity increased successfully for the user.', docu.data().id, documentId );
    });
  } catch (error) {
    console.error('Error increasing quantity for the user:', error);
  }   
};


// Function to decrease the quantity by 1 for a specific document
const decreaseQuantityByOne = async (documentId) => {
  // console.log("currentUser ", currentUser.email);
  try {
    const cartRef = collection(db, 'cart');
    const q = query(cartRef, where('user', '==', currentUser.email)); 
    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot", querySnapshot);

    querySnapshot.forEach(async (docu) => {
      if (docu.data().id === documentId) {
        const currentQuantity = docu.data().quantity;

        const newQuantity = currentQuantity - 1; // Decreament the current quantity by 1
        const docRef = doc(db, 'cart', docu.id); 

        if (newQuantity < 1) {
          // Delete the document if the new quantity is less than 1
          await deleteDoc(docRef);
          console.log('Document deleted successfully.', doc.data().id, documentId);
        } else {
          
          await updateDoc(docRef, {
            quantity: newQuantity
          });
          
          console.log(docu.data().quantity);
        }
      }
      console.log('Quantity decreased successfully for the user.', docu.data().id, documentId );
    });
  } catch (error) {
    console.error('Error decreasing quantity for the user:', error);
  }   
}
const placeOrder = async () => {
  // Create an order object
  const order = {
    orditem: cart, // Copy the cart array[...cart]
    total: total,
    createdAt: serverTimestamp()
  };

  try {
    // Add the order to the Firestore "orders" collection
    const docRef = await addDoc(collection(db, 'orders'), order);
    console.log('Order placed with ID: ', docRef.id);

    // Clear the cart and reset total after placing the order
    const cartRef = collection(db, 'cart');
    const q = query(cartRef, where('user', '==', currentUser.email)); 
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docu) => {
 
        const docRef = doc(db, 'cart', docu.id); 
        await deleteDoc(docRef);
        console.log('Cart DB empty successfully.');
    });
    setCart([]);
    setTotal(0);
  } catch (error) {
    console.error('Error placing order: ', error);
  }
};

const contextvalue = {
      cart, 
      setCart,
      placeOrder,
      setTotal,
      addToCart, 
      userData, 
      fetchSpecificUserData, 
      total, 
      cartLength, 
      increaseQuantityByOne,
      decreaseQuantityByOne,
    }



  return (
    <CartContext.Provider value={ contextvalue }>
      {children}
    </CartContext.Provider>
  );
};