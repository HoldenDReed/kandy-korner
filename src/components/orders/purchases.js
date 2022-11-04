import { useEffect, useState } from "react";
import "./purchases.css"
import { useNavigate } from "react-router-dom";
export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/locations`)
                const locationsArray = await response.json()
                setLocations(locationsArray)
            }
            fetchData()
        },
        []
    )

    return <>
        <h2>List of Locations</h2>

        <article className="loactions">
            {
                locations.map(
                    (location) => {
                        return <section key={`location--${location.id}`} className="location">
                            <header>Address: {location.address}</header>
                            <footer>Square Footage: {location.squareFootage}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}
export const ProductsList = ({ searchTermState }) => {
    const [products, setProduct] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPrice, setTopPrice] = useState([])
    const [searchedProducts, setSearchedProducts] = useState([])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            const fetchProduct = async () => {
                const response = await fetch(`http://localhost:8088/products?_expand=productType&_sort=name&_order=desc`)
                const productsArray = await response.json()
                setProduct(productsArray)
            }
            fetchProduct()
        },
        []
    )
    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setSearchedProducts(searchedProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            setFilteredProducts(products)
        },
        [products]
    )


    useEffect(
        () => {
            if (topPrice) {
                const topPriceItem = filteredProducts.filter(product => product.price >= 2)
                setFilteredProducts(topPriceItem)
            }
            else {
                setFilteredProducts(products)
            }
        },
        [topPrice]
    )

    return <>
        {
            kandyUserObject.staff
                ? <>
                    <button onClick={() => setTopPrice(true)}>Top Price</button>
                    <button onClick={() => setTopPrice(false)}>Show All</button>
                    <button onClick={() => navigate("/product/create")}>Create Order</button>
                    <h2>List of Products</h2>
                    <article className="products">
                        {
                            filteredProducts.map(
                                (product) => {
                                    return <section key={`product--${product.id}`} className="product">
                                        <header>Name: {product.name}</header>
                                        <p>Product Type: {product.productType.productType}</p>
                                        <footer>Price: ${product.price}</footer>
                                    </section>
                                }
                            )
                        }
                    </article>
                </>
                : <>
                    <h2>Search Product</h2>
                    <article className="products">
                        {
                            searchedProducts.map(
                                (product) => {
                                    return <section key={`product--${product.id}`} className="product">
                                        <header>Name: {product.name}</header>
                                        <footer>Price: ${product.price}</footer>
                                    </section>
                                }
                            )
                        }
                    </article>
                </>
        }


    </>
}
