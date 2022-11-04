import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [employee, updateEmployee] = useState({
        rate: "",
        startDate: "",
        locationId: "",
        userId: ""
    })

    const [user, updateUser] = useState({
        fullName: "",
        email: "",
        isStaff: true,
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        let employeeToSendToAPI = {
            userId: employee.userId,
            startDate: employee.startDate,
            locationId: employee.locationId,
            rate: employee.rate
        }

        let userToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: user.isStaff
        }

        // TODO: Perform the fetch() to POST the object to the API
        fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(response => response.json())

            .then(response => {
                const copy = { ...employee }
                copy.userId = response.id
                updateEmployee(copy)
                    (fetch(`http://localhost:8088/employees`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(copy)
                    })
                        .then(response => response.json())
                        .then(response => { console.log(response) })
                        .then(() => {
                            navigate("/employees");

                        }))
            }
            )
    }


    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee Full Name"
                        value={user.fullName}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.fullName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rate">Rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Pay Rate"
                        value={employee.rate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.rate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Start Date"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.startDate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Enter location:</label>
                    <select required autoFocus value={employee.locationId} onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.locationId = parseInt(evt.target.value)
                            updateEmployee(copy)
                        }
                    }>
                        <option value="1">123 Nowhere land</option>
                        <option value="2">420 Weed smokers lane</option>
                        <option value="3">720 Cyberspace way</option>
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Employee
            </button>
        </form>
    )
}