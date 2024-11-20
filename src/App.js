import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./componants/product/Product";
import About from "./componants/about/About";
import Home from "./componants/home/Home";
import NewProduct from "./componants/product/NewProduct";

import { useEffect, useState } from "react";
import EditProduct from "./componants/product/EditProduct";

function App() {
  const [currentRoute, setscurrentRoute] = useState();

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    setscurrentRoute(path)
  }, []);
  return (
    <div>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <nav className="nav navbar-expand sticky-top bg-body-tertiary m-2 ">
          <ul className="nav nav nav-tabs text-white mx-5">
            <li className="nav-item hover m-2">
              <Link onClick={()=>setscurrentRoute("home")} className={currentRoute==="home" ?"btn btn-info px-5":"btn btn-outline-info px-5"} to={"/home"}>
                
              <i className="fa fa-home"></i>
              </Link>
            </li>
            <li className="nav-item hover m-2">
              <Link onClick={()=>setscurrentRoute("products")} className={currentRoute==="products" ?"btn btn-info px-5":"btn btn-outline-info px-5"} to={"/products"}>
                
              <i className="fa fa-store"></i>
              </Link>
            </li>
            <li className="nav-item hover m-2">
              <Link onClick={()=>setscurrentRoute("newproduct")} className={currentRoute==="newproduct" ?"btn btn-info px-5":"btn btn-outline-info px-5"} to={"/newproduct"}>
                
              <i className="fa fa-apple"></i>
              </Link>
            </li>
            <li className="nav-item hover m-2">
              <Link onClick={()=>setscurrentRoute("about")} className={currentRoute==="about" ?"btn btn-info px-5":"btn btn-outline-info px-5"} to={"/about"}>
                
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
        </nav>

        <Routes >
          
          <Route  path="/home" element={<Home />}>
            
          </Route>
          <Route  path="/products" element={<Products />}>
            
          </Route>
          <Route path="/product/:id" element={<EditProduct />}>
            
          </Route>
          <Route  path="/newproduct" element={<NewProduct />}>
            
          </Route>
          <Route  path="/about" element={<About />}>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
