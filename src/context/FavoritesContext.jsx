import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	// Load favorites from AsyncStorage on mount
	useEffect(() => {
		loadFavorites();
	}, []);

	const loadFavorites = async () => {
		try {
			const storedFavorites = await AsyncStorage.getItem('favorites');
			if (storedFavorites) {
				setFavorites(JSON.parse(storedFavorites));
			}
		} catch (error) {
			console.error('Error loading favorites:', error);
		}
	};

	const saveFavorites = async (newFavorites) => {
		try {
			await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
			setFavorites(newFavorites);
		} catch (error) {
			console.error('Error saving favorites:', error);
		}
	};

	const addToFavorites = (property) => {
		const isAlreadyFavorite = favorites.some(fav => fav.id === property.id);
		if (!isAlreadyFavorite) {
			const newFavorites = [...favorites, property];
			saveFavorites(newFavorites);
		}
	};

	const removeFromFavorites = (propertyId) => {
		const newFavorites = favorites.filter(fav => fav.id !== propertyId);
		saveFavorites(newFavorites);
	};

	const isFavorite = (propertyId) => {
		return favorites.some(fav => fav.id === propertyId);
	};

	const clearAllFavorites = () => {
		saveFavorites([]);
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addToFavorites,
				removeFromFavorites,
				isFavorite,
				clearAllFavorites,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error('useFavorites must be used within a FavoritesProvider');
	}
	return context;
};

