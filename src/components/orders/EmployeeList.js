import { useEffect } from "react"
import { useState } from "react"
import { Employee } from "./Employee"
import { useNavigate } from "react-router-dom"
import "./Employees.css"


export const EmployeeList = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
                const employeeArray = await response.json()
                setEmployees(employeeArray)
            }
            fetchData()
        },
        []
    )

    return <>
    <button onClick={() => navigate("/employees/create")}>New Employee</button> 
    <artical className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee?.user?.fullName} 
                location={employee?.location?.address}
                startDate={employee.startDate}
                rate={employee.rate} />)
        }
    </artical>
    </>
}