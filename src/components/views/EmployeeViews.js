import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../orders/purchases"
import { ProductsList } from "../orders/purchases"
import { ProductForm } from "../orders/ProductCreate"
import { EmployeeList } from "../orders/EmployeeList"
import { EmployeeForm } from "../orders/EmployeeForm"
import { CustomerList } from "../orders/CustomerList"
import { CustomerDetails} from "../orders/CustomerDetails"

export const EmployeeViews = () => {
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
                <Route path="products" element={ <ProductsList /> } />
                <Route path="product/create" element={ <ProductForm /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/create" element={ <EmployeeForm /> } />
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails/> } />
            </Route>
            
        </Routes>
    )
}