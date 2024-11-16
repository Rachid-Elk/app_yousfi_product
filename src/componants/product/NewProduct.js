import React, { useState } from "react";
import { getProduct, getProducts, saveProducts } from "../../app/app";

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, quantity: 0, checked: false });
  // const handleProductAdd = () => {
  //   saveProducts(newProduct).then(resp => {
  //     setNewProduct([...newProduct, resp.data]);
  //     setNewProduct({ name: '', price: 0, quantity: 0, checked: false });
  //   });
  // };
    // Function to add a new product
    const handleProductAdd = (event) => {
      event.preventDefault();
      saveProducts(newProduct).then((resp) => {
        setNewProduct([...newProduct, resp.data]); // Add the new product to the state
        alert(JSON.stringify(resp.data));
        setNewProduct({ name: '', price: 0, quantity: 0, checked: false });
      }).catch(err => {
        console.log(err);
      });
    };
  return (
    <div className="">
      <div className="row d-flex justify-content-center align-items-center">
        
        <div className="col-md-8    row  justify-content-center  ">
          <div
            className="  bg-black  p-0 m-2  shadow-lg col-6   opacity-25 rounded"
            style={{ margin: "auto" }}
          >
            <div className=" d-flex justify-content-center align-items-center">
              <h1 className="text-white  p-3 font-">New Product</h1>
            </div>
          </div>
          <div className="card-body row ">
            <div className="col"></div>
            <div className="col-8 shadow-lg bg-body-tertiary p-3">
              <form onSubmit={handleProductAdd}>
                <div className="form-group text-dark col mt-3 mb-4">
                  <label className="form-label" for="name">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="form-control "
                    required
                  />
                </div>
                <div className="form-group col mt-3 mb-4">
                  <label className="form-label" for="price">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col mt-3 mb-4">
                  <label className="form-label" for="quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div class="form-check mt-3 mb-4">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name="checked"
                      value={newProduct.checked}
                      onChange={(e) => setNewProduct({ ...newProduct, checked: e.target.value })}
                      required
                    />
                    Checked
                  </label>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-success m-3"
                    onClick={() => {
                      handleProductAdd();
                    }}
                  >
                    <i class="fas fa-save   mx-5  "></i>
                  </button>
                  <button className="btn btn-danger">
                    <i class="fas fa-close mx-5    "></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="col"></div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
