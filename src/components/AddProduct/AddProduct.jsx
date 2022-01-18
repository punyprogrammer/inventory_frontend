import { useState } from "react";
import "./addproduct.css";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [productImg, setProductImg] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState(" ");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submiterr, setSubmitErr] = useState(false);
  const [errorData, setErrorData] = useState({});
  const categoryOptions = [
    { label: "None", value: " " },
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
  const postHandler = async (e) => {
    e.preventDefault();
    console.log("Submit CLicked");
    try {
      setUploading(true);
      const response = await axios.post(
        "https://guitarinventoryapi.herokuapp.com/api/v1/products",
        {
          name,
          price,
          rating,
          productImg,
          category,
          brand,
        }
      );
      setSuccess(true);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setSubmitErr(true);
      console.log(error.response);
      const errorObject = {};
      errorObject.errorMessage = error.response.data.error.errorMessage;
      errorObject.errorType = error.response.data.error.errorType;
      errorObject.fieldsError = error.response.data.error.errorField;
      setErrorData(errorObject);
    }
  };
  return (
    <div className="addProductContainer">
      <div className="addProductHeading">
        <h1 className="addProductsHeadingText">
          ADD New Product to the Inventory!!
        </h1>
      </div>
      <form className="addProductDetailsContainer" onSubmit={postHandler}>
        <div className="formInput">
          <span className="formInputLabel">Name</span>
          <input
            type="text"
            className="formInputField"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formInput">
          <span className="formInputLabel">Price:</span>
          <input
            type="text"
            className="formInputField"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="formInput">
          <span className="formInputLabel">Rating:</span>
          <input
            type="text"
            className="formInputField"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="formInput">
          <span className="formInputLabel">
            Product Image(Add image hyperlink)
          </span>
          <input
            type="text"
            className="formInputField"
            value={productImg}
            onChange={(e) => setProductImg(e.target.value)}
          />
        </div>
        <div className="formInput">
          <span className="formInputLabel">Brand</span>
          <input
            type="text"
            className="formInputField"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="formInput">
          <span className="formInputLabel">Category</span>
          <select
            className="categorySelect"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option className="categorySelectItem" value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="formInput">
          <button className="submitButton" type="submit">
            Add New Product
          </button>
        </div>
      </form>
      <div className="addProductStatusContainer">
        {uploading && <h1>Adding Product to Inventory...</h1>}
        {success ? (
          <div className="successContainer">
            <span className="successText">
              Product Succesfully added to the cart
            </span>
          </div>
        ) : (
          submiterr && (
            <div className="errorContainer">
              <h4 className="errorMessage">
                Error Message:{errorData?.errorMessage}
              </h4>
              <h4 className="errorType">Error Type:{errorData?.errorType}</h4>
              <div className="errorFields">
                {errorData?.fieldsError?.map((item) => {
                  return (
                    <div className="errorField">
                      <h5 className="errorFieldText">
                        {item?.field} : {item?.fieldMessage}
                      </h5>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AddProduct;
