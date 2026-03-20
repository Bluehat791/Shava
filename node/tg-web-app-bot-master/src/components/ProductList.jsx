import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ isAdmin }) => {
    const [products, setProducts] = useState({
        snacks: [],
        mainMenu: [],
        drinks: [],
        sauces: []
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8800/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
        }
    };

    const handleDelete = async (category, id) => {
        try {
            await fetch(`http://localhost:8800/api/products/${category}/${id}`, {
                method: 'DELETE'
            });
            fetchProducts(); // Обновляем список после удаления
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
        }
    };

    return (
        <div className="product-list">
            <section>
                <h2>Снеки</h2>
                <div className="products-grid">
                    {products.snacks.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isAdmin={isAdmin}
                            onDelete={() => handleDelete('snacks', product.id)}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2>Основное меню</h2>
                <div className="products-grid">
                    {products.mainMenu.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isAdmin={isAdmin}
                            onDelete={() => handleDelete('mainMenu', product.id)}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2>Напитки</h2>
                <div className="products-grid">
                    {products.drinks.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isAdmin={isAdmin}
                            onDelete={() => handleDelete('drinks', product.id)}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2>Соусы</h2>
                <div className="products-grid">
                    {products.sauces.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isAdmin={isAdmin}
                            onDelete={() => handleDelete('sauces', product.id)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductList; 