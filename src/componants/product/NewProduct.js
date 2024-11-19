import React, { useState, useEffect } from "react";
import { saveProducts, getProducts } from "../../app/app";

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    checked: false,
    id: "",  // ID sera généré
  });

  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]);

  // Récupère les produits existants lors du chargement du composant
  useEffect(() => {
    getProducts().then((resp) => {
      setProducts(resp.data);
    });
  }, []);

  // const generateUniqueId = (name, products) => {
  //   // Filtrer les produits qui ont le même nom
  //   const sameNameProducts = products.filter(product => product.name === name);
    
  //   // Si aucun produit avec ce nom, retourner un ID par défaut avec "_1"
  //   if (sameNameProducts.length === 0) {
  //     return `${name}_1`;
  //   }
    
  //   // Sinon, incrémenter le suffixe (ex: "_2", "_3", etc.)
  //   const lastProduct = sameNameProducts[sameNameProducts.length - 1];  // Dernier produit avec ce nom
  //   const lastSuffix = parseInt(lastProduct.id.split('_')[1], 10);  // Extraire le suffixe numérique
  //   const newSuffix = lastSuffix + 1;  // Incrémenter
    
  //   return `${name}_${newSuffix}`;  // Générer un nouvel ID unique
  //   // setNewProduct(lastProduct);
  // };
  

  // const handleProductAdd = (event) => {
  //   event.preventDefault();
    
  //   // Générer un ID unique pour le produit en fonction du nom
  //   const productId = generateUniqueId(newProduct.name, products);
  
  //   // Créer un nouveau produit avec l'ID généré
  //   const newProductWithId = { ...newProduct, id: productId };
  
  //   // Ajouter le produit à l'API ou à la base de données
  //   saveProducts(newProductWithId)
  //     .then((resp) => {
  //       setNewProduct({ name: "", price: 0, quantity: 0, checked: false });
  //       alert(`Produit ajouté avec succès: ${newProductWithId.name}`);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  const generateUniqueId = (name, products) => {
    const sameNameProducts = products.filter((product) => product.name === name);
    const highestSuffix = sameNameProducts.reduce((max, product) => {
      const match = product.id.match(new RegExp(`${name}_(\\d+)$`));
      if (match) {
        return Math.max(max, parseInt(match[1], 10));
      }
      return max;
    }, 0);
  
    return `${name}_${highestSuffix + 1}`;
  };
  
  console.log(products);
  
  const handleProductAdd = (event) => {
    event.preventDefault();
  
    // Étape 1 : Récupérer tous les produits depuis le serveur
    getProducts()
      .then((resp) => {
        const allProducts = resp.data;
  
        // Étape 2 : Générer un ID unique
        const uniqueId = generateUniqueId(newProduct.name, allProducts);
  
        // Étape 3 : Ajouter l'ID généré au nouveau produit
        const updatedProduct = { ...newProduct, id: uniqueId };
  
        // Étape 4 : Sauvegarder le produit sur le serveur
        saveProducts(updatedProduct)
          .then(() => {
            // Mise à jour de l'état local pour afficher les données actualisées
            setNewProduct({ name: "", price: 0, quantity: 0, checked: false });
            alert(`Produit ajouté avec succès : ${JSON.stringify(updatedProduct)}`);
          })
          .catch((err) => {
            console.error("Erreur lors de l'ajout du produit :", err);
          });
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des produits :", err);
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
                  placeholder="price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
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
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
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
                    checked={newProduct.checked}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        checked: e.target.checked,
                      })
                    }
                    required
                  />
                  Checked
                </label>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-success m-3">
                  <i className="fas fa-save mx-5"></i>Save
                </button>
                <button className="btn btn-danger" type="button">
                  <i className="fas fa-close mx-5"></i>Cancel
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
