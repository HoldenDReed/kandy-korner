import { useEffect } from "react"
import { useState } from "react"
import { Customer } from "./Customer"
import "./Customer.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/users?isStaff=false`)
                const customerArray = await response.json()
                setCustomers(customerArray)
            }
            fetchData()
        },
        []
    )

    return <>
        <artical className="customers">
            {
                customers.map(customer => <Customer key={`customer--${customer.id}`}
                    id={customer.id}
                    fullName={customer.fullName}
                    email={customer.email} />)
            }
        </artical>
    </>
}