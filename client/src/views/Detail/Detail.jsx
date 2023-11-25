import React, { useEffect } from "react";
import {useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getProductById, resetProductDetail } from "../../redux/actions";
import { Link } from 'react-router-dom';

import "./detail.css"


export default function Detail(){
  const useProducts= () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productsDetail = useSelector((state) => state.productsDetail);
    
    useEffect(() => {
      if (id) {
        dispatch(getProductById(id, false))
          .then(() => console.log("Éxito"))
          .catch((err) => {
            throw new Error("Error en la acción:", err);
          });
      }
      return () => {
        dispatch(resetProductDetail());
      };
    }, [dispatch, id]);

    return productsDetail  
  }
  

  const productDetail=useProducts();

  return(
      <div className="containerDetail">
          <Link to="/Home"><button className="btn-back">🔙</button></Link>
          <img src={productDetail.image} className="image"/>
          <div className="titles">
          <h2>{productDetail.title}</h2>
          <h3>Fabricante: {productDetail.manufacturer}</h3>
          <h3>Creador: {productDetail.author}</h3>
          <h3>Stock: {productDetail.stock} unidades</h3>
          <h3>${productDetail.price}</h3>
          <h3>Categoria: {productDetail.category}</h3>
          <h4>{productDetail.description}</h4>
          </div>
      </div>
  )
}


