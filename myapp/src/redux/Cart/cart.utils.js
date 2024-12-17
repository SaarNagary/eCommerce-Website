export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  const id = nextCartItem.productID || nextCartItem.documentID;
  if (!id) {
    console.log("No Valid ID found");
    return false;
  }

  return prevCartItems.find(
    (cartItem) => cartItem.productID === id || cartItem.documentID === id
  );
};

/*export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExist = existingCartItem({ prevCartItems, nextCartItem });
  if (cartItemExist) {
    return prevCartItems.map((cartItem) =>
      cartItem.documentID === nextCartItem.documentID
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
    },
  ];
};*/

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const id = nextCartItem.productID || nextCartItem.documentID;
  if(!id){
    console.log('No Valid ID found');
    return prevCartItems;
  }
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem.productID === id || cartItem.documentID === id
  );

  if (existingCartItem) {
    // אם המוצר כבר בעגלה, עדכן את הכמות
    return prevCartItems.map((cartItem) =>
      cartItem.productID === id || cartItem.documentID === id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // אם המוצר לא נמצא, הוסף אותו לעגלה
  return [...prevCartItems, { ...nextCartItem, quantity: 1 }];
};


export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  const id = cartItemToRemove.productID || cartItemToRemove.documentID;
  if (!id) {
    console.log("No Valid ID found");
    return prevCartItems;
  }
  return prevCartItems.filter(
    (item) => item.productID !== id && item.documentID !== id
  );
};

export const handleReduceCartItem = ({prevCartItems, cartItemToReduce}) => {
  const id = cartItemToReduce.productID || cartItemToReduce.documentID;
  if (!id) {
    console.log("No Valid ID found");
    return prevCartItems;
  }
  const existingCartItem = prevCartItems.find(cartItem => 
    cartItem.productID === id || cartItem.documentID === id)

  if(existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      cartItem => cartItem.productID !== id && cartItem.documentID !== id
    )
  }
  return prevCartItems.map(cartItem => 
    cartItem.productID === id || cartItem.documentID === id ? 
    {...cartItem,quantity: cartItem.quantity - 1}
     : cartItem)
}




