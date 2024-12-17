import React, { useEffect } from "react";
import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";
import { addProduct } from "../../redux/Cart/cart.actions";
import Button from "../Forms/Button";

const ProductCart = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productID } = useParams();
  const product = useSelector((state) => state.productsData.product);

  const { productName, productThumbnail, productPrice, productDesc } =
    product || {};

  useEffect(() => {
    if (productID) {
      dispatch(fetchProductStart(productID));
    }
    return () => {
      dispatch(setProduct({}));
    };
  }, [dispatch, productID]);

  const handleAddToCart = (product) => {
    if (!product) return;
    const cartItem = {
      productID: productID, // מזהה ייחודי
      productName,
      productPrice,
      productThumbnail,
      quantity: 1,
    };
    dispatch(addProduct(cartItem));
    navigate("/cart");
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCart">
      <div className="hero">
        <img src={productThumbnail} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>${productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
          <li>
            <span dangerouslySetInnerHTML={{ __html: productDesc }} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCart;
