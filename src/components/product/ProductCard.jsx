import React from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/300';

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group">
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.discountPrice && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        GIẢM GIÁ
                    </span>
                )}
            </div>
            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-800 text-lg truncate">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <span className="text-green-700 font-bold">
                        {(product.discountPrice || product.price).toLocaleString()}đ
                    </span>
                    {product.discountPrice && (
                        <span className="text-gray-400 text-sm line-through">
                            {product.price.toLocaleString()}đ
                        </span>
                    )}
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
};

export default ProductCard;