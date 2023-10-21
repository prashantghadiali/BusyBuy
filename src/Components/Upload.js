import { db } from "../firebaseInit";
import { collection, addDoc } from "firebase/firestore"; 
import { productdata } from "./productdata";

export function uploadData(){
    productdata.forEach( async (product)=>{
        
        const docRef = await addDoc(collection(db, "product"), product);
    })
}


