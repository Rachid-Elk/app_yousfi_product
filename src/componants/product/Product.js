
import React, { useEffect, useState } from 'react';
import { checkProducts, deleteProducts, getProducts } from '../../app/app';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = () => {
      getProducts().then(resp => {
        const products = resp.data;
        console.log("products : ",products);
        
        setProducts(products);
      })
      .catch(err => {
        console.log(err);
      });
  }
const handleProductDelete=(product)=>{
  deleteProducts(product).then(resp=>{
    const newProduct = products.filter((p) => p.id !== product.id)
    setProducts(newProduct) 
  })

}
const handleProductCheck=(product)=>{
  checkProducts(product).then((resp) => {
    const newProduct = products.map((p) => {
      if(p.id === product.id ){
        p.checked =! p.checked
      }
     
      return p
      
  });
  setProducts(newProduct)
})}

  

// const handleProductAdd=()=>{

// }

  return (
    <div>
      <div className='container mt-5'>
        
        <table className='table  table-hover m-3'>
          <thead className=' bg-dark text-white'>
            <tr className='text-center '>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Checked</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody >
          {products.map((product) => (
          <tr className='text-center' key={product.id} >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
              <button onClick={()=>{handleProductCheck(product)}} className="btn btn-outline-success">{product.checked===true ? <i className="fas fa-check "></i> :<i className="fas fa-dot-circle "></i> }</button>
              </td>
              
              <td className='d-flex justify-content-around' >
                <button className='btn btn-outline-danger ' onClick={()=>handleProductDelete(product)}> <i className="fas fa-trash " aria-hidden="true"></i> </button>
                <button className='btn btn-outline-info ' onClick={() => navigate(`/product/${product.id}`)}> <i className="fas fa-eye " aria-hidden="true"></i> </button>
                {/* <button className='btn btn-outline-success ' onClick={()=>handleProductAdd()}> <i className="fas fa-add " aria-hidden="true"></i> </button> */}
              </td>
            </tr>))}
            </tbody>
          
        </table>
        
        
        
      </div>
    </div>
  );
}
