import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product";
import FormSelect from "../Forms/FormSelect";
import LoadMore from "../LoadMore";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterType } = useParams();

  const products = useSelector((state) => state.productsData.products) || {};
  const { data = [], queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [dispatch, filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;
  if (!data || data.length < 1) {
    return (
      <div className="products">
        <p>No Search Results</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <div className="products">
      <h1 className="products-title">Browse Products</h1>
      <FormSelect {...configFilters} />
      <div className="products-grid">
        {data.map((product) => {
          const { documentID, productThumbnail, productName, productPrice } =
            product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };
          return <Product key={documentID} {...configProduct} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
