"use client"


const { createContext, Children, useReducer, useContext, useEffect } = require("react");


const CartContext = createContext()

const cartReducer = (state,action) => {
    switch(action.type) {
        case "ADD_TO_CART" : 
            const existingItem = state.find((item)=> item.id === action.payload.id)
            if(existingItem)
            {
                return state.map((item) =>
                    item.id === action.payload.id ? {...item, quantity : item.quantity + action.payload.quantity} : item 
                )
            }

            return [...state,action.payload]
        case "UPDATE_QUANTITY" :
            return state.map((item) => 
                item.id === action.payload.id ? {...item,quantity : action.payload.quantity} : item
             )
        case "REMOVE_FROM_CART" :
            return state.filter((item) => item.id !== action.payload.id) 
        case "BULK_REMOVE" :
            return state.filter((item) => !action.payload.includes(item.id));
      
        default :
            return state
    }
}

export const CartProvider = ({children}) =>{

    const initialCart = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) || [] : []
    const [cart,dispatch] = useReducer(cartReducer,initialCart)

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])

    return (
        <CartContext.Provider value={{cart,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}

