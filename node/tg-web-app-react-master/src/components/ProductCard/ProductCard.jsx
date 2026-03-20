//import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [removedIngredients, setRemovedIngredients] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const toggleIngredient = (ingredient) => {
        setSelectedIngredients(prev => {
            if (prev.find(i => i.id === ingredient.id)) {
                return prev.filter(i => i.id !== ingredient.id);
            }
            return [...prev, ingredient];
        });
    };

    const toggleRemoveIngredient = (ingredient) => {
        setRemovedIngredients(prev => {
            if (prev.find(i => i.id === ingredient.id)) {
                return prev.filter(i => i.id !== ingredient.id);
            }
            return [...prev, ingredient];
        });
    };

    const calculateTotalPrice = () => {
        const basePrice = product.price;
        const additionsPrice = selectedIngredients.reduce((sum, ing) => sum + (ing.price || 0), 0);
        return basePrice + additionsPrice;
    };

    const handleAddToCart = () => {
        const finalProduct = {
            ...product,
            finalPrice: calculateTotalPrice(),
            addedIngredients: selectedIngredients,
            removedIngredients: removedIngredients
        };
        
        setIsAdded(true);
        onAddToCart(finalProduct);
        
        // Сброс анимации
        setTimeout(() => setIsAdded(false), 300);
    };

    console.log('Product data:', product);
    console.log('Removable ingredients:', product.removableIngredients);

    return (
        <motion.div 
            className="product-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {product.popular && (
                <motion.span 
                    className="popular-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    🔥 Популярное
                </motion.span>
            )}
            
            <div className="image-container">
                <img src={product.photoUrl} alt={product.name} />
                <div className="image-overlay">
                    <button 
                        className="details-btn"
                        onClick={() => setShowDetails(true)}
                    >
                        Подробнее
                    </button>
                </div>
            </div>

            <div className="product-content">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <motion.div 
                    className="price"
                    whileHover={{ scale: 1.05 }}
                >
                    {calculateTotalPrice()}₽
                </motion.div>
                
                <AnimatePresence>
                    {showDetails && (

                        <motion.div 
                            className="details-modal"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            

                        <button 
                            className="close-btn"
                            onClick={() => setShowDetails(false)}
                            onTouchStart={(e) => {
                            e.preventDefault(); // Предотвращаем стандартное поведение
                            setShowDetails(false);
                            }}
                            onTouchMove={() => {}} // Пустой обработчик для Safari
                            aria-label="Close details"
                        >
                            ✕
                        </button>

                            {/* Ингредиенты */}
                            <div className="ingredients-section">
                                <h4>Дополнительно:</h4>
                                {product.ingredients.map(ing => (
                                    <div key={ing.id} className="ingredient-item">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedIngredients.some(i => i.id === ing.id)}
                                                onChange={() => toggleIngredient(ing)}
                                            />
                                            <span>{ing.name}</span>
                                            <span className="price-tag">+{ing.price}₽</span>
                                        </label>
                                    </div>
                                ))}
                                {product.removableIngredients?.map(ing => (
                                    <div key={ing.id} className="ingredient-item">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={removedIngredients.some(i => i.id === ing.id)}
                                                onChange={() => toggleRemoveIngredient(ing)}
                                            />
                                            Убрать {ing.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <motion.button 
                    className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.95 }}
                >
                    {isAdded ? '✓ Добавлено' : 'Добавить в корзину'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard; 
