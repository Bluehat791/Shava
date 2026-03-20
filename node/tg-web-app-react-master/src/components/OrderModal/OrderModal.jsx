import React, { useState } from 'react';
import './OrderModal.css';

const OrderModal = ({ isOpen, onClose, onSubmit, totalPrice }) => {
    const [deliveryType, setDeliveryType] = useState('');
    const [payType, setPayType] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            deliveryType,
            payType,
            phone,
            address: deliveryType === 'delivery' ? address : null
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Оформление заказа</h2>
                <form onSubmit={handleSubmit}>
                    <div className="delivery-type">
                        <label>
                            <input
                                type="radio"
                                value="pickup"
                                checked={deliveryType === 'pickup'}
                                onChange={(e) => setDeliveryType(e.target.value)}
                            />
                            Самовывоз
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="delivery"
                                checked={deliveryType === 'delivery'}
                                onChange={(e) => setDeliveryType(e.target.value)}
                            />
                            Доставка
                        </label>
                    </div>
                    <div className="form-group">
                    
                    </div>
	    {deliveryType === 'delivery' &&(<div className="delivery-type">
		     <label>Способ оплаты:</label>
                        <label>
                            <input
                                    type="radio"
                                    value="transfer"
                                    checked={payType === 'transfer'}
                                    onChange={(q) => setPayType(q.target.value)}
                                />
                            Перевод
                        </label>
                    </div>)}
                    <div className="form-group">

                        <label>Номер телефона:</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+7 (___) ___-__-__"
                            required
                        />
                    </div>

                    {deliveryType === 'delivery' && (
                        <div className="form-group">
                            <label>Адрес доставки:</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Введите адрес доставки"
                                required
                            />
                            <label>Доставка по г .Аксай бесплатна при заказе от 1200р. При заказе до 1200р - доставка 250р</label>
                        </div>
                    )}

                    <div className="total-price">
                        Итого к оплате: {totalPrice} ₽
                    </div>

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Отмена</button>
                        <button 
                            type="submit" 
                            disabled={!deliveryType || !phone || (deliveryType === 'delivery' && !address)}
                        >
                            Заказать
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderModal; 


