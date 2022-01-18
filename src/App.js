import "./App.css";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import AddProduct from "./components/AddProduct/AddProduct";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Header />
              <Products />
            </>
          }
        ></Route>
        <Route
          path="/addproduct"
          element={
            <>
              <Header />
              <AddProduct />
            </>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
