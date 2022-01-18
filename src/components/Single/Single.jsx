import { useRef, useState } from "react";
import "./single.css";
import axios from "axios";

const Single = ({ item }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [nameValue, setNameValue] = useState(item.name);
  const [priceValue, setPriceValue] = useState(item.price);
  const [ratingValue, setRatingValue] = useState(item.rating);
  const [categoryValue, setCategoryValue] = useState(item.category);
  const [brandValue, setBrandValue] = useState(item.brand);
  const [quantityValue, setQuantityValue] = useState(item.quantity);
  const [modifying, setModifying] = useState(false);
  const [success, setSucess] = useState(false);
  const [editerror, setEditError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteerror, setDeleteError] = useState(false);
  const [delSuccess, setDelSuccess] = useState(false);
  const editProductHandler = async (e) => {
    e.preventDefault();
    try {
      setSucess(false);
      setEditError(false);
      setModifying(true);
      const response = await axios.put(
        `https://guitarinventoryapi.herokuapp.com/api/v1/products/${item._id}`,
        {
          name: nameValue,
          price: priceValue,
          rating: ratingValue,
          category: categoryValue,
          brand: brandValue,
          quantity: quantityValue,
        }
      );
      setModifying(false);
      setEditMode(false);
      setSucess(true);
    } catch (error) {
      setModifying(false);
      setEditMode(false);
      setEditError(true);
    }
  };
  const deleteProductHandler = async (e) => {
    e.preventDefault();
    setDeleteMode(false);
    try {
      setDeleting(true);
      const response = await axios.delete(
        `https://guitarinventoryapi.herokuapp.com/api/v1/products/${item._id}`
      );
      setDelSuccess(true);
      setDeleting(false);
    } catch (error) {
      setDelSuccess(false);
      setDeleting(false);
      setDeleteError(true);
    }
  };


  return (
    <div className="singleWrapper">
      <div className="singleContainer">
        <div className="imageContainer">
          <img src={item.productImg} alt="" className="singleImage" />
        </div>
        <div className="infoContainer">
          <div className="singleInfo">
            {editMode ? (
              <input
                className="editName"
                onChange={(e) => setNameValue(e.target.value)}
                value={nameValue}
              ></input>
            ) : (
              <span className="infoName">{nameValue}</span>
            )}
          </div>
          <div className="singleInfo">
            <span className="infoLabel">Price:</span>
            {editMode ? (
              <input
                className="editPrice"
                onChange={(e) => setPriceValue(e.target.value)}
                value={priceValue}
              ></input>
            ) : (
              <span classPrice="infoPrice">${priceValue}</span>
            )}
          </div>
          <div className="singleInfo">
            <span className="infoLabel">Rating :</span>
            {editMode ? (
              <input
                className="editRating"
                onChange={(e) => setRatingValue(e.target.value)}
                value={ratingValue}
              ></input>
            ) : (
              <span className="infoRating">{ratingValue}</span>
            )}
          </div>
          <div className="singleInfo">
            <span className="infoLabel">Category :</span>
            {editMode ? (
              <input
                className="editCategory"
                onChange={(e) => setCategoryValue(e.target.value)}
                value={categoryValue}
              ></input>
            ) : (
              <span className="infoCategory">{categoryValue}</span>
            )}
          </div>
          <div className="singleInfo">
            <span className="infoLabel">Brand:</span>
            {editMode ? (
              <input
                className="editBrand"
                onChange={(e) => setBrandValue(e.target.value)}
                value={brandValue}
              ></input>
            ) : (
              <span className="infoBrand">{brandValue}</span>
            )}
          </div>
          <div className="singleInfo">
            <span className="infoLabel">Quantity:</span>
            {editMode ? (
              <input
                className="editBrand"
                onChange={(e) => setQuantityValue(e.target.value)}
                value={quantityValue}
              ></input>
            ) : (
              <span className="infoBrand">{quantityValue}</span>
            )}
          </div>
        </div>
        <div className="modifyContainer">
          {editMode ? (
            <button className="modifyButton" onClick={editProductHandler}>
              Modify
            </button>
          ) : (
            <button className="editButton" onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
          <button className="deleteButton" onClick={() => setDeleteMode(true)}>
            Delete
          </button>
          <h4 className="statusText">
            {modifying ? (
              <span>Modifying...</span>
            ) : success ? (
              <span style={{ color: "green" }}>
                Product Successfully Modified
              </span>
            ) : (
              editerror && (
                <span style={{ color: "red" }}>Something went wrong</span>
              )
            )}
          </h4>
          <div className="deleteContainer">
            {!deleteMode &&
              (deleting ? (
                <h4>Deleting item...</h4>
              ) : delSuccess ? (
                <h4 style={{ color: "green", marginTop: "10px" }}>
                  Successfully Deleted!!
                </h4>
              ) : (
                deleteerror && (
                  <h4 style={{ color: "red", marginTop: "10px" }}>
                    Something went wrong couldnt delete!!
                  </h4>
                )
              ))}
            {deleteMode && (
              <div className="deletePrompt">
                <span>Are you sure you want to delete</span>
                <button
                  className="deleteYesButton"
                  onClick={deleteProductHandler}
                >
                  Yes
                </button>
                <button
                  className="deleteNoButton"
                  onClick={() => setDeleteMode(false)}
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
