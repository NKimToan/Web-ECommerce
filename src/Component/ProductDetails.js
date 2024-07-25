import { useState, useEffect } from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";
import useFetch from "./useFetch.js";
import Loader from "./Loader.js";

export default function ProductDetails(props) {
    const [product, setProduct] = useState({});
    const { get, loading } = useFetch("https://react-tutorial-demo.firebaseio.com/");
    // const { get } = useFetch("https://course-assets.tek4.vn/reactjs-assets/");
    const params = useParams();

    useEffect(() => {
        get(`productinfo/id${params.id}.json`)
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => console.log("Could not load product details", error));
    }, []);

    return (
        <div className="product-details-layout">
            <div>
                {loading && <Loader />}
                <h2>{product.name}</h2>
                <img
                    src={product.image}
                    width="125"
                    height="125"
                    className="product-details-image"
                    alt={product.name}
                />
            </div>
            <div>
                <div className="tabs">
                    <ul>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? "tab-active" : ""} to="" end>
                                Details
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? "tab-active" : ""} to="nutrition">
                                Nutrition
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? "tab-active" : ""}
                                to="storage"
                            >
                                Storage
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <Outlet context={product} />
            </div>
        </div>
    );
}
