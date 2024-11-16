import React, { useState } from "react";
import { saveProducts } from "../../app/app";

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    checked: false,
  });

  // Fonction pour ajouter un produit
  const handleProductAdd = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    saveProducts(newProduct)
      .then((resp) => {
        alert("Produit ajouté avec succès !");
        console.log("Produit ajouté :", resp.data);
        // Réinitialiser les champs du formulaire
        setNewProduct({ name: "", price: 0, quantity: 0, checked: false });
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout :", err);
      });
  };

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-8 row justify-content-center">
        <div
          className="bg-black p-0 m-2 shadow-lg col-6 opacity-25 rounded"
          style={{ margin: "auto" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <h1 className="text-white p-3">New Product</h1>
          </div>
        </div>
        <div className="card-body row">
          <div className="col"></div>
          <div className="col-8 shadow-lg bg-body-tertiary p-3">
            <form onSubmit={handleProductAdd}>
              <div className="form-group text-dark col mt-3 mb-4">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group col mt-3 mb-4">
                <label className="form-label" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="form-group col mt-3 mb-4">
                <label className="form-label" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      quantity: parseInt(e.target.value, 10),
                    })
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="form-check mt-3 mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="checked"
                  checked={newProduct.checked}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, checked: e.target.checked })
                  }
                />
                <label className="form-check-label">Checked</label>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-success m-3">
                  <i className="fas fa-save mx-5"></i> Save
                </button>
                <button
                  type="reset"
                  className="btn btn-danger"
                  onClick={() =>
                    setNewProduct({ name: "", price: 0, quantity: 0, checked: false })
                  }
                >
                  <i className="fas fa-close mx-5"></i> Reset
                </button>
              </div>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}
