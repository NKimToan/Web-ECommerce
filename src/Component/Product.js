import { Link } from "react-router-dom";
import Button from "./Button";
export default function Product(props) {
    const { details } = props;
    const productFromCart = props.cart.find(
        (product) => product.id === details.id
    );
    const quantity = productFromCart ? productFromCart.quantity : 0;
    return (
        <div className="product">
            <div className="product-image-container">
                <Link to={`${details.id}`}>
                    <img
                        src={details.image}
                        width="100"
                        height="100"
                        className="product-image"
                        alt={details.name}
                    />
                </Link>
                {quantity > 0 && (
                    <div className="product-quantity-container">
                        <div className="product-quantity">{quantity}</div>
                    </div>)}
            </div>
            <div className="product-info">
                <h3>{details.name}</h3>
                <p>{details.description}</p>
            </div>
            <div className="product-checkout">
                <div>
                    <Button
                        outline
                        className="product-delete"
                        onClick={() => props.onProductDelete(details.id)}
                    >x</Button>
                </div>
                <Button outline onClick={() => props.onProductAdd(details)}>{details.price}</Button>
            </div>
        </div>
    );
}
