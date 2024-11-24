import React, { useEffect, useState } from "react";
import {
  checkProducts,
  deleteProducts,
  getProducts,
  getAllProducts,
} from "../../app/app.js";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [state, setState] = useState({
    products: [],
    currentPage: 1,
    pageSize: 5,
    keyword: "",
    totalPages: 0,
  });

  const navigate = useNavigate();

  // Appel initial + dépendances
  useEffect(() => {
    handleGetProduct(state.keyword, state.currentPage, state.pageSize);
  }, [state.currentPage, state.keyword, state.pageSize]);

  const handleGetProduct = async (keyword, page, size) => {
    console.log("Fetching products with:", { keyword, page, size });
    try {
      const [total, resp] = await Promise.all([
        getAllProducts(), // Nombre total de produits
        getProducts(keyword, page, size), // Produits paginés
      ]);

      let totalPages = Math.ceil(total / size);
      if(total%size !==0) totalPages++;
      console.log("Total pages:", totalPages, "Products:", resp.data);

      setState( ({
        ...state,
        products: resp.data,
        keyword:keyword,
        currentPage: page,
        pageSize: size,
        totalPages,
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  const handleProductDelete = (product) => {
    deleteProducts(product).then(() => {
      const updatedProducts = state.products.filter((p) => p.id !== product.id);
      setState((prevState) => ({
        ...prevState,
        products: updatedProducts,
      }));
    });
  };

  const handleProductCheck = (product) => {
    checkProducts(product).then(() => {
      const updatedProducts = state.products.map((p) => {
        if (p.id === product.id) {
          return { ...p, checked: !p.checked };
        }
        return p;
      });
      setState((prevState) => ({
        ...prevState,
        products: updatedProducts,
      }));
    });
  };

  const handleGoToPage = (page) => {
    // if (page > 0 && page <= state.totalPages) {
    //   setState((prevState) => ({
    //     ...prevState,
    //     currentPage: page,
    //   }));
    // }
    handleGetProduct(state.keyword,page,state.pageSize)
  };

  return (
    <div>
      <div className="container mt-5">
        <table className="table table-hover m-3">
          <thead className="bg-dark text-white">
            <tr className="text-center">
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Checked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map((product) => (
              <tr className="text-center" key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    onClick={() => handleProductCheck(product)}
                    className="btn btn-outline-success"
                  >
                    {product.checked ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-dot-circle"></i>
                    )}
                  </button>
                </td>
                <td className="d-flex justify-content-around">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleProductDelete(product)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-outline-secondary"
          disabled={state.currentPage === 1}
          onClick={() => handleGoToPage(state.currentPage - 1)}
        >
          Précédent
        </button>

        <ul className="pagination-list list-unstyled d-flex gap-2 mx-3">
          {Array.from({ length: state.totalPages }, (_, index) => (
            // {new Array(state.totalPages).fill(0).map((v,index)=>(
            <li key={index}>
              <button
                className={
                  index + 1 === state.currentPage
                    ? "btn btn-success"
                    : "btn btn-outline-success"
                }
                onClick={() => handleGoToPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="btn btn-outline-secondary"
          disabled={state.currentPage === state.totalPages}
          onClick={() => handleGoToPage(state.currentPage + 1)}
        >
          Suivant
        </button>
      </div>
      </div>

      
    </div>
  );
}
