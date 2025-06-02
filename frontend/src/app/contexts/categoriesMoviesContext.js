import {createContext, useContext, useState} from "react";

const CategoriesContext = createContext();

export const CategoriesContextProvider = ({ children }) => {
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);

    return (
        <CategoriesContext.Provider value={{categories, setCategories, category, setCategory}}>
            {children}
        </CategoriesContext.Provider>
    )
}

export const useCategories = () => {
    return useContext(CategoriesContext);
}