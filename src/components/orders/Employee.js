
export const Employee = ({ id, fullName, location, startDate, rate}) => {
            return <section className="employee">
                <div>Name: {fullName}</div>
                <div>Location: {location}</div>
                <div>Start Date: {startDate}</div>
                <div>rate: {rate}</div>
            </section>
}