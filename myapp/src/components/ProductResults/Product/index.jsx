import React from "react";
import '../styles.css'
import Button from "../../Forms/Button";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { addProduct } from "../../../redux/Cart/cart.actions";

const Product = (product) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { documentID, productThumbnail, productName, productPrice } = product;
  if (!documentID || !productThumbnail || !productName || typeof productPrice === "undefined")
    return null;

  const configAddToCartBtn = {
    type : 'button'
  }

  const handleAddToCart = (product) => {
    if(!product) return;
    dispatch(
      addProduct(product)
    )
    navigate('/cart')
  }

  return (
  <div className="product">
    <div className="thumb">
      <Link to={`/product/${documentID}`}>
        <img src={productThumbnail} alt={productName}/>
      </Link>
    </div>
    <div className="details">
      <ul>
        <li>
          <span>
            <Link to={`/product/${documentID}`}>
              {productName}
            </Link>
          </span>
        </li>
        <li>
          <span>
            ${productPrice}
          </span>
        </li>
        <li>
         <div className="addToCart">
          <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
            Add to cart
          </Button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  )
};

export default Product;
