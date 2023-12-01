import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, resetProductDetail,buyProduct } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./detail.css";
import FavButton from '../../components/FavButton/FavButton';
import Reviews from '../../components/Review/Review';
import { createReview, getProductReviews } from '../../redux/actions/';

export default function Detail() {
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1); 
  const { id } = useParams(); //modifique 
  const useProducts = () => {
    
    
    
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
    return productsDetail;
  };

  const productDetail = useProducts();
  
const Buy = () => {
    
    console.log(id)
    
    for (let i = 0; i < quantity; i++) {
      dispatch(buyProduct(id));
      
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [productId, setProductId] = useState(null);
  useEffect(() => {
    if (productDetail?.id) {
      setProductId(productDetail.id);
      dispatch(getProductReviews(productDetail.id));
    }
  }, [dispatch, productDetail]);

  return (
    <div>
      <Link to="/home">
        <button className="btn-back">🔙</button>
      </Link>
      <div className="containerDetail">
        <img src={productDetail.image} className="image" />
        <div className="titles">
          <h2>{productDetail.title}</h2>
          <h3>Fabricante: {productDetail.manufacturer}</h3>
          <h3>Creador: {productDetail.author}</h3>
          <h3>Stock: {productDetail.stock} unidades</h3>
          <h3>${productDetail.price}</h3>
          <h3>Categoria: {productDetail.category}</h3>
          <h4>{productDetail.description}</h4>
          <FavButton/>

          <button className="bg-black"onClick={Buy}>COMPRAR PRODUCTO</button>
          
          <div>
           <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
           <button onClick={handleIncrement}>+</button>
          </div>
          <Link to="/car">
              <button className="mt-20">IR AL CARRITO DE COMPRAS</button>

          </Link>
        </div>
      </div>
      <div className="reviews">
        {productDetail.Reviews && productDetail.Reviews.length > 0 ? (
          productDetail.Reviews.map((r) => <div key={r.id}>
                  <li key={r.id}>
                      <p>Reviews 📝: {r.content}</p>
                      <p> ⭐Score: {Array(parseInt(r.score, 10)).fill('⭐').join(' ')}</p>
                    </li>
                </div>
        )) : (
          <Reviews productId={productId} />
        )}
      </div>
    </div>
  );
}
