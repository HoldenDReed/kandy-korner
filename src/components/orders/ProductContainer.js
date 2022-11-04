import { useState } from "react"
import { ProductsList } from "./purchases"
import { ProductSearch} from "./ProductSearch"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return  <>
        <ProductSearch  setterFunction={setSearchTerms} />
        <ProductsList searchTermState={searchTerms} />
    </>
}
