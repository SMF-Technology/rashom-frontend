"use client";

import { createContext, useReducer, useContext, useEffect } from "react";

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      if (!state.some((item) => item.id === action.payload.id)) {
        return [...state, action.payload];
      }
      return state;

    case "REMOVE_FROM_FAVORITES":
      return state.filter((item) => item.id !== action.payload.id);
    case "REMOVE_BULK_FROM_FAVORITES":
        return state.filter((item) => !action.payload.includes(item.id));

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const initialFavorites =
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("favorites")) || [] : [];

  const [favorites, dispatch] = useReducer(favoritesReducer, initialFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return <FavoritesContext.Provider value={{ favorites, dispatch }}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
