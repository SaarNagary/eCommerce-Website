import { collection, addDoc, query, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "./../../firebase/utils";

export const handleSaveOrder = async (order) => {
  try {
    const ordersCollectionRef = collection(firestore, "orders"); // צור רפרנס לאוסף "orders"
    await addDoc(ordersCollectionRef, order); // הוסף מסמך חדש עם הנתונים של ההזמנה
    return;
  } catch (err) {
    throw err;
  }
};


export const handleGetUserOrderHistory = async(uid) => {
  try{
    const orderQuery = query(
      collection(firestore, "orders"),
      where("orderUserID", "==", uid),
      orderBy("orderCreatedDate")
    )
    const querySnapshot = await getDocs(orderQuery);

    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      documentID: doc.id
    }))
    return {data};
  } catch(err){
    throw err;
  }
}


export const handleGetOrder = async(orderID) => {
  try{
    const orderDocRef = doc(firestore, "orders", orderID);
    const snap = await getDoc(orderDocRef);
    if(snap.exists()){
      return{
        ...snap.data(),
        documentID: orderID,
      }
    }else{
      throw new Error("Order does not exist"); 
    }
  }catch(err){
    throw err;
  }
}

