import React, { useEffect } from "react";
import {useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions";
import { Link } from 'react-router-dom';

import "./detail.css"


export default function Detail(){
  const useProducts=()=>{

      const {id}=useParams();
      const dispatch=useDispatch();
      const productsDetail = useSelector((state) => state.productsDetail);
      

       

      useEffect(() => {
        if (id) {
          dispatch(getProductById(id))
            .then(() => console.log("Éxito"))
            .catch((err) => {
              console.error("Error en la acción:", err);
              throw new Error(err);
            });
        }
      
      }, [dispatch, id]);

      return productsDetail  
  }

 

  const productDetail=useProducts();


   
  return(
      <div className="containerDetail">
          <Link to="/Home"><button className="btn-back" >🔙</button></Link>
          <img src={productDetail.image} className="image"/>
          <div className="titles">
          <h2>{productDetail.title}</h2>
          <h2>{productDetail.manufacturer}</h2>
          <h2>{productDetail.author}</h2>
          <h2>{productDetail.stock}</h2>
          <h2>{productDetail.price}</h2>
          <h2>{productDetail.available}</h2>
          <h2>{productDetail.description}</h2>
          <h2>{productDetail.category}</h2>
          </div>
      </div>
  )
}


