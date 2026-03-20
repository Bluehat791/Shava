import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, isAdmin, onDelete }) => {
    const [showIngredients, setShowIngredients] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [removedIngredients, setRemovedIngredients] = useState([]);

    const toggleIngredient = (ingredient) => {
        if (selectedIngredients.find(i => i.id === ingredient.id)) {
            setSelectedIngredients(selectedIngredients.filter(i => i.id !== ingredient.id));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const toggleRemoveIngredient = (ingredient) => {
        if (removedIngredients.find(i => i.id === ingredient.id)) {
            setRemovedIngredients(removedIngredients.filter(i => i.id !== ingredient.id));
        } else {
            setRemovedIngredients([...removedIngredients, ingredient]);
        }
    };

    const calculateTotalPrice = () => {
        const additionsPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
        return product.price + additionsPrice;
    };

    return (
        <div className="product-card">
            <img src={product.photoUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{calculateTotalPrice()} ₽</p>
            
            {product.description && <p>{product.description}</p>}
            
            <button onClick={() => setShowIngredients(!showIngredients)}>
                {showIngredients ? 'Скрыть состав' : 'Показать состав'}
            </button>

            {showIngredients && (
                <div className="ingredients">
                    {product.ingredients?.map(ing => (
                        <label key={ing.id}>
                            <input
                                type="checkbox"
                                checked={selectedIngredients.some(i => i.id === ing.id)}
                                onChange={() => toggleIngredient(ing)}
                            />
                            {ing.name} (+{ing.price} ₽)
                        </label>
                    ))}

                    {product.removableIngredients?.map(ing => (
                        <label key={ing.id}>
                            <input
                                type="checkbox"
                                checked={removedIngredients.some(i => i.id === ing.id)}
                                onChange={() => toggleRemoveIngredient(ing)}
                            />
                            Убрать {ing.name}
                        </label>
                    ))}
                </div>
            )}

            {isAdmin && (
                <button onClick={() => onDelete(product.id)} className="delete-btn">
                    Удалить
                </button>
            )}
        </div>
    );
};

export default ProductCard; 