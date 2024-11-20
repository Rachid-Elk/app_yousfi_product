import React, { useState, useEffect, useContext } from "react";
import { getProductById, updateProduct } from "../../app/app";
import { useParams, useNavigate } from "react-router-dom";
//  import { ProductsContext } from "../context/ProductsContext";

export default function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const { quantity,setQuantity } = useState(0); // Récupère l'ID via les paramètres d'URL
  const [editingProduct, setEditingProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Pour naviguer après l'édition
  // const [state, setState] = useContext(ProductsContext);

  // Récupère les produits existants lors du chargement du composant
  useEffect(() => {
    handleGetProductById(id);
  },);

  const handleGetProductById = (id) => {
    getProductById(id).then((resp) => {

      
          console.log(resp.data)
          setName(resp.data.name);
          setPrice(resp.data.price);
          setQuantity(resp.data.quantity);
          setChecked(resp.data.checked);
        
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération du produit :", error)
      );
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const product = { id, name, price, quantity,checked };
    updateProduct(product)
      .then((resp) => {
        const updated = resp.data;
        const newProducts = editingProduct.map((p) =>
          p.id === updated.id ? updated : p
        );
        setEditingProduct({  editingPrduct: newProducts });
        alert("Produit mis à jour !");
        navigate("/products"); // Redirige vers la liste des produits
      })
      .catch((err) => console.error("Erreur lors de la mise à jour :", err));
  };

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-8 row justify-content-center">
        <div className="bg-black p-0 m-2 shadow-lg col-6 opacity-25 rounded">
          <div className="d-flex justify-content-center align-items-center">
            <h1 className="text-white p-3">
              Product :{" "}
              <h2 className="text-danger fw-bold">{name}</h2>
            </h1>
          </div>
        </div>
        <div className="card-body row">
          <div className="col"></div>
          <div className="col-8 shadow-lg bg-body-tertiary p-3">
            <form onSubmit={handleUpdateProduct} method="post">
              <div className="form-group text-dark col mt-3 mb-4">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) =>
                    setName({
                      name: e.target.value,
                    })
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
                  placeholder="price"
                  value={price}
                  onChange={(e) =>
                    setPrice({
                      price: e.target.value,
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
                  placeholder="quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity({
                      quantity: e.target.value,
                    })
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="form-check mt-3 mb-4">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="checked"
                    value={checked}
                  onChange={(e) =>
                    setChecked({
                      checked: e.target.value,
                    })
                  
                    }
                  />
                  Checked
                </label>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-success m-3">
                  <i className="fas fa-pencil-square mx-5">Update</i>
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => navigate("/products")}
                >
                  <i className="fas fa-ban mx-5"></i>Exit
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
