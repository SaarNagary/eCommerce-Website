import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  getDoc
} from "firebase/firestore";

const firestore = getFirestore();

export const handleAddProduct = async (product) => {
  try {
    const productCollection = collection(firestore, "products");
    await addDoc(productCollection, product);
    console.log("Product added successfully:", product);
  } catch (err) {
    console.error("Error adding product:", err); // לוג לשגיאה
    throw err;
  }
};

export const handleFetchProducts = async ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  const pageSize = 6;
  try {
    const productCollection = collection(firestore, "products");
    let productQuery = query(
      productCollection,
      ...(filterType ? [where("productCategory", "==", filterType)] : []),
      orderBy("createdDate"),
      limit(pageSize)
    );
    if (startAfterDoc) {
      productQuery = query(productQuery, startAfter(startAfterDoc));
    }

    const snapshot = await getDocs(productQuery);
    const totalCount = snapshot.size;
    const data = [
      ...persistProducts,
      ...snapshot.docs.map((doc) => ({
        ...doc.data(),
        documentID: doc.id,
      })),
    ];
    /*const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        documentID: doc.id
        
       }))*/
    /*return {data,
          queryDoc: snapshot.docs[snapshot.docs.length - 1],
          isLastPage: data.length < pageSize
        };*/
    return {
      data,
      queryDoc: snapshot.docs[totalCount - 1],
      isLastPage: totalCount < 1,
    };
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const handleDeleteProduct = async (documentID) => {
  try {
    const productDoc = doc(firestore, "products", documentID);
    await deleteDoc(productDoc);
    console.log("Product deleted successfully:", documentID);
  } catch (err) {
    console.log("Error deleting product", err);
    throw err;
  }
  /*return new Promise((resolve,reject) => {
    firestore
    .collection('products')
    .doc(documentID)
    .delete()
    .then(() => {
      resolve()
    })
    .catch((err) => {
      reject(err)
    })
  })*/
};

export const handleFetchProduct = async(productID) => {
try{
    const productDoc = doc(firestore, 'products', productID)
    const snapshot = await getDoc(productDoc);

    if(snapshot.exists()){
      return {...snapshot.data(), productID : productID}
    }
    else{
      throw new Error("Product not found");
    }
  } catch(err){
    console.error("Error fetching product:", err);
    throw err;
  }
};
