import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const ProductForm = () => {

    const [product, update] = useState({
        name: "",
        productTypeId: 1,
        price: 1
    });

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productsToSendToAPI = {
            name: product.name,
            productTypeId: product.productTypeId,
            price: product.price
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productsToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }

    return (
        <form>
            <h2>New Product Form</h2>

            <fieldset>
                <div className="form-group">
                    <label>Enter your name:</label>
                    <input
                        required autoFocus
                        type="text"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={(evt) => {
                            const copy = { ...product }
                            copy.name = evt.target.value
                            update(copy)
                        }
                        }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Enter product Type:</label>
                    <select required autoFocus value={product.productTypeId} onChange={
                        (evt) => {
                            const copy = { ...product }
                            copy.productTypeId = parseInt(evt.target.value)
                            update(copy)
                        }
                    }>
                        <option value="1">Chocolate</option>
                        <option value="2">Gummies</option>
                        <option value="3">Hard Candy</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Enter product price:</label>
                    <input
                        required autoFocus
                        type="number"
                        placeholder="price"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = parseInt(evt.target.value)
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Product
            </button>
        </form>
    )
}
/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/
