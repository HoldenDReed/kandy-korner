
export const ProductSearch = ({ setterFunction }) => {
    return (
        <div>
        <input 
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        type="text" id="productInput" placeholder="Enter search terms" />
        <label for="productInput"> What candy are you looking for?</label>
        </div>
    )
}