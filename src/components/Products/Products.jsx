import "./products.css";
import productsData from "../../data";
import Single from "../Single/Single";
import { useState, useEffect } from "react";
import axios from "axios";
import { wait } from "@testing-library/user-event/dist/utils";

const Products = () => {
  const [fetchErr, setFetchErr] = useState(false);
  const [products, setProducts] = useState([]);
  const [brandOptions, setBrandOptions] = useState([
    { label: "None", value: "" },
  ]);
  const [sortFilter, setSortFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [brandQuery, setBrandQuery] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchQuery, setFetchQuery] = useState(
    `https://guitarinventoryapi.herokuapp.com/api/v1/products?sortedBy=${sortFilter}&category=${categoryFilter}&brand=${brandFilter}`
  );
  const categoryOptions = [
    { label: "None", value: "" },
    {
      label: "Acoustic",
      value: "Acoustic",
    },
    {
      label: "Electric",
      value: "Electric",
    },
    {
      label: "Classical",
      value: "Classical",
    },
  ];
  const sortOptions = [
    { label: "None", value: "" },
    {
      label: "Price(Low to High)",
      value: "price",
    },
    {
      label: "Price(High to Low)",
      value: "-price",
    },
    {
      label: "Quantity(Low to High)",
      value: "quantity",
    },
    {
      label: "Quantity(High to Low)",
      value: "-quantity",
    },
    {
      label: "Rating(Low to High)",
      value: "rating",
    },
    {
      label: "Rating(High to Low)",
      value: "-rating",
    },
  ];
  //applyFilter Handler
  const applyFilterHandler = (e) => {
    e.preventDefault();
    setFetchQuery(
      `https://guitarinventoryapi.herokuapp.com/api/v1/products?sortedBy=${sortFilter}&category=${categoryFilter}&brand=${brandFilter}`
    );
    fetchProducts();
  };
  //clearFilters handler
  const clearFilterHandler = (e) => {
    e.preventDefault();
    setSortFilter("");
    setCategoryFilter("");
    setBrandFilter("");
    setFetchQuery(`https://guitarinventoryapi.herokuapp.com/api/v1/products`);
    fetchProducts();
  };

  //function to fetchbrands on initialRender
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        "https://guitarinventoryapi.herokuapp.com/api/v1/brands"
      );
      console.log(response.data.data);
      setBrandOptions(
        [{label:'None',value:''}].concat(response.data.data.map((item) => {
          return { label: item, value: item };
        }))
      );
    } catch (error) {}
  };
  //function to fetch products
  const fetchProducts = async () => {
    setFetching(true);
    console.log(sortFilter);
    console.log(categoryFilter);
    try {
      console.log(fetchQuery);
      const response = await axios.get(fetchQuery);

      setProducts(response.data.data);
      setFetching(false);
    } catch (error) {
      setFetchErr(true);
      setFetching(false);
    }
  };
  //useEffect for running whenever query change
  useEffect(() => {
    fetchProducts();
  }, [fetchQuery]);
  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <div className="productsContainer">
      <div className="productsHeading">
        <h1 className="productsHeadingText">
          {" "}
          Welcome to GuitarStore ,Discover all products here!!
        </h1>
      </div>
      <div className="productFilterContainer">
        <div className="productFilter">
          <div className="singleFilter">
            <span className="filterText">Sort By:</span>
            <select
              className="sortFilterSelect"
              onChange={(e) => setSortFilter(e.target.value)}
              value={sortFilter}
            >
              {sortOptions.map((option) => (
                <option className="sortSelectItem" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="singleFilter">
            <span className="filterText">Category :</span>
            <select
              value={categoryFilter}
              className="categoryFilterSelect"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categoryOptions.map((option) => (
                <option className="categorySelectItem" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="singleFilter">
            <span className="filterText">Brand :</span>
            <select
              className="brandFilterSelect"
              onChange={(e) => setBrandFilter(e.target.value)}
              value={brandFilter}
            >
              {brandOptions.map((option) => (
                <option className="categorySelectItem" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="singleFilter">
            <button className="applyFilters" onClick={applyFilterHandler}>
              Apply Filters
            </button>
          </div>
          <div className="singleFilter">
            <button className="clearFilters" onClick={clearFilterHandler}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      {fetching && (
        <div
          className="fetchingContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "red" }}>Fetching Products...</h3>
        </div>
      )}

      {fetchErr ? (
        <div
          className="fetchErrorContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 className="fetchErrorText" style={{ color: "red" }}>
            Something went wrong products could not be fetched
          </h3>
        </div>
      ) : (
        <div className="productsListing">
          <h3>{products.length} Products Found</h3>
          {products.map((item) => {
            return <Single item={item} key={item._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
