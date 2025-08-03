'use client'
import { useState, useEffect, useRef } from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/types";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';

export default function CourseList({ courses }: { courses: Course[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<any>(null);
    const itemsPerView = 5;
    const maxIndex = Math.max(0, courses.length - itemsPerView);
    const scrollToIndex = (index: number) => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.children[0]?.offsetWidth || 0;
            const gap = 16; // gap-4 = 16px
            carouselRef.current.scrollTo({
                left: index * (itemWidth + gap),
                behavior: 'smooth'
            });
        }
    };

    const handlePrevious = () => {
        const newIndex = Math.max(0, currentIndex - 1);
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
    };

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            scrollToIndex(newIndex);
        } else {
            // Khi ở cuối, chuyển sang trang chi tiết (có thể customize)
            handleViewAllProducts();
        }
    };
    const handleViewAllProducts = () => {
        alert('Chuyển sang trang chi tiết sản phẩm');
    };

      const handleProductClick = (product:any) => {
    alert(`Xem chi tiết sản phẩm: ${product.name}`);
    // Trong thực tế: router.push(`/product/${product.id}`)
  };
  type BadgeType = 'Hot' | 'New' | 'Sale' | 'Popular' | 'Best Seller' | 'Premium';
  const getBadgeColor = (badge:BadgeType) => {
    const colors: Record<BadgeType, string> = {
    'Hot': 'bg-red-500',
    'New': 'bg-green-500',
    'Sale': 'bg-orange-500',
    'Popular': 'bg-blue-500',
    'Best Seller': 'bg-purple-500',
    'Premium': 'bg-yellow-500'
  };
    return colors[badge] || 'bg-gray-500';
  };
    console.log('Courses', courses);
    return (

        <div className="flex flex-col min-h-screen justify-start items-center md:justify-start md:items-start mx-auto mb-10 2xl:mt-10">

             <div className="flex justify-center items-center mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-1 md:gap-y-7 lg:grid-cols-3 xl:grid-cols-5 2xl:gap-x-0 ">
                {courses.map((course: Course) => (
                    <div key={course.id} className="">

                        <CourseCard course={course} />
                    </div>
                ))}

            </div> 
            
            <div className="w-full justify-center items-center mx-auto mx-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h2>
                        <p className="text-gray-600 mt-2">Khám phá những sản phẩm công nghệ hàng đầu</p>
                    </div>
                    <button
                        onClick={handleViewAllProducts}
                        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors"
                    >
                        Xem tất cả
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Left Arrow - Chỉ hiển thị khi không ở đầu */}
                    {currentIndex > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                    )}

                    {/* Right Arrow - Luôn hiển thị */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Products Container */}
                    <div
                        ref={carouselRef}
                        className="flex gap-4 overflow-x-hidden scroll-smooth px-12"
                    >
                        {courses.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden rounded-t-xl">
                                    <img
                                        src={product.thumb}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Badge */}
                                    <div className={`absolute top-3 left-3 ${getBadgeColor('Hot')} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                                        {"Hot"}
                                    </div>

                                    {/* Discount */}
                               

                                    {/* Quick Actions */}
                                    <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                                            <Heart className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                                            <ShoppingCart className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium text-gray-700 ml-1">
                                                {product.averageRating}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            (250 đánh giá)
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xl font-bold text-red-600">
                                            {product.price}₫
                                        </span>
                                        {product && (
                                            <span className="text-sm text-gray-500 line-through">
                                                50000000₫
                                            </span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                scrollToIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                                    ? 'bg-blue-600 scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>

        </div>

    );
}