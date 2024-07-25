import { useState } from "react";
import Button from "./Button.js";
// Thêm để thanh toán
import { loadStripe } from "@stripe/stripe-js";
import Input from "./Input.js";

const stripeLoadedPromise = loadStripe(
    "pk_test_51HsqkCGuhXEITAut89vmc4jtjYd7XPs8hWfo2XPef15MFqI8rCFc8NqQU9WutlUBsd8kmNqHBeEmSrdMMpeEEyfT00KzeVdate"
);
// Visa thử nghiệm: 4242 4242 4242 4242 
export default function Cart({ cart }) {
    const totalPrice = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );
    const [email, setEmail] = useState("");
    function handleFormSubmit(event) {
        event.preventDefault();
        const lineItems = cart.map((product) => {
            console.log("product_price = ", product.price_id);
            console.log("product quantity = ", product.quantity);
            return { price: product.price_id, quantity: product.quantity };
        });
        stripeLoadedPromise.then((stripe) => {
            stripe
                .redirectToCheckout({
                    lineItems: lineItems,
                    mode: "payment",
                    successUrl: "http://localhost:3000/cart",
                    cancelUrl: "http://localhost:3000/cart",
                    customerEmail: email,
                })
                .then((response) => {
                    console.log(response.error)
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    }
    return (
        <div className="cart-layout">
            <div>
                <h1>Your Cart</h1>
                {cart.length === 0 && (
                    <p>You have not added any product to your cart yet.</p>
                )}
                {cart.length > 0 && (
                    <>
                        <table className="table table-cart">
                            <thead>
                                <tr>
                                    <th width="25%" className="th-product">Product</th>
                                    <th width="20%">Unit price</th>
                                    <th width="10%">Quanity</th>
                                    <th width="25%">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>
                                                <img
                                                    src={product.image}
                                                    width="30"
                                                    height="30"
                                                    alt="" /> {" "}
                                                {product.name}
                                            </td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <strong>${product.price * product.quantity}</strong>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="2"></th>
                                    <th className="cart-highlight">Total</th>
                                    <th className="cart-highlight">${totalPrice}</th>
                                </tr>
                            </tfoot>
                        </table>
                        <form className="pay-form" onSubmit={handleFormSubmit}>
                            <p>
                                Enter your email and then click on pay and your products will be
                                delivered to you on the same day!
                            </p>
                            <Input
                                placeholder="Email"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                                type="email"
                                required
                            />
                            <Button type="submit">Pay</Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
