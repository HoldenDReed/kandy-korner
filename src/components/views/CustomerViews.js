import { Outlet, Route, Routes } from "react-router-dom"
import { ProductContainer } from "../orders/ProductContainer"
import { LocationsList } from "../orders/purchases"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Corner Candy Shop</h1>
                    <div>Your one-stop-shop to get all your candy fixins</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationsList /> } />
                <Route path="products/search" element={ <ProductContainer /> } />
            </Route>
            
        </Routes>
    )
}