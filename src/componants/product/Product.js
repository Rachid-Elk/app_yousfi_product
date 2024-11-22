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
  useEffect(() => {
    handleGetProduct(state.keyword, state.currentPage, state.pageSize);
  }, []);

  const handleGetProduct = async (keyword, page, size) => {
    const [total, resp] = await Promise.all([
      getAllProducts(),
      getProducts(keyword, page, size),
    ]);
    const totalElement = total;
    let totalPages = Math.ceil(totalElement / size);
    console.log("total page ", totalPages);
    if (totalElement % size !== 0) ++totalPages;
    console.log({ total, resp });

    setState({
      ...state,
      products: resp.data,
      keyword: keyword,
      currentPage: page,
      pageSize: size,
      totalPages: totalPages,
    });
    // .then(resp => {
    //   //  const nombreProd= state.products.length

    //    let totalPages = Math.ceil(total/size);
    //    console.log("total " ,totalPages);
    //   if(total % size !== 0) ++totalPages ;
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  };
  const handleProductDelete = (product) => {
    deleteProducts(product).then((resp) => {
      const newProduct = state.products.filter((p) => p.id !== product.id);
      setState({ ...state, products: newProduct });
    });
  };
  const handleProductCheck = (product) => {
    checkProducts(product).then((resp) => {
      const newProduct = state.products.map((p) => {
        if (p.id === product.id) {
          p.checked = !p.checked;
        }

        return p;
      });
      setState({ ...state, products: newProduct });
    });
  };

  // const handleProductAdd=()=>{

  // }

  return (
    <div>
      <div className="container mt-5">
        <table className="table  table-hover m-3">
          <thead className=" bg-dark text-white">
            <tr className="text-center ">
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
                    onClick={() => {
                      handleProductCheck(product);
                    }}
                    className="btn btn-outline-success"
                  >
                    {product.checked === true ? (
                      <i className="fas fa-check "></i>
                    ) : (
                      <i className="fas fa-dot-circle "></i>
                    )}
                  </button>
                </td>

                <td className="d-flex justify-content-around">
                  <button
                    className="btn btn-outline-danger "
                    onClick={() => handleProductDelete(product)}
                  >
                    {" "}
                    <i className="fas fa-trash " aria-hidden="true"></i>{" "}
                  </button>
                  <button
                    className="btn btn-outline-info "
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {" "}
                    <i className="fas fa-eye " aria-hidden="true"></i>{" "}
                  </button>
                  {/* <button className='btn btn-outline-success ' onClick={()=>handleProductAdd()}> <i className="fas fa-add " aria-hidden="true"></i> </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div>
          <ul className="pagination-list list-unstyled d-flex gap-2">
            {state.totalPages > 0 &&
              Array.from({ length: state.totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={
                      !index ? "btn btn-success" : "btn btn-outline-success"
                    }
                    onClick={() => {
                      setState({ ...state, currentPage: index++ });
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
