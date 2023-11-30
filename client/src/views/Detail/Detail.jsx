import React, { useContext, useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, resetProductDetail,buyProduct } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./detail.css";
import FavButton from '../../components/FavButton/FavButton';
import { CartContext } from "../../context/CartContext";
import NavBar from "../../components/NavBar/NavBar";

export default function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams(); //modifique 
  const [quantity, setQuantity] = useState(1); 
  const {agregarAlCarrito} = useContext(CartContext);

  const useProducts = () => {
    const productsDetail = useSelector((state) => state.productsDetail);
    useEffect(() => {
      if (id) {
        dispatch(getProductById(id, false))
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

  const handleIncrement = () => {
    quantity < productDetail.stock && setQuantity(quantity + 1)
  };
  
  const handleDecrement = () => {
    quantity > 1 && setQuantity(quantity - 1)
    }

  return (
    <div>
      <NavBar/>
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
          <button className="bg-black"onClick={() => {agregarAlCarrito(productDetail, quantity)}}>Agregar al Carrito</button>
          <div>
            <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          <Link to="/car">
              <button className="mt-20">Ir al Carrito</button>
          </Link>
        </div>
      </div>
      <div className="reviews">
        {productDetail.Reviews && productDetail.Reviews.length > 0 ? (
          productDetail.Reviews.map((r) => <p key={r.id}>{r.content}</p>)
        ) : (
          <p>No hay reviews de este producto todavía!</p>
        )}
      </div>
    </div>
  );
}
