"use client"

import { useEffect, useState, useRef } from "react"
import MovieCard from "@/app/components/MovieCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ScrollMovie({ data }) {
    const [isLoading, setLoading] = useState(true);
    const prevRef = useRef(null)
    const nextRef = useRef(null)

    useEffect(() => {
        setLoading(false);
    }, [data])

    if (isLoading) {
        return (
            <div></div>
        )
    }
    return (
        <div className="relative">
            <button ref={prevRef} className="group absolute w-10 h-10 left-0 top-1/3 z-10 -translate-y-1/2 bg-white hover:bg-orange-500 transition-colors duration-300 ease-in p-1 rounded-full flex items-center justify-center">
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='8px'
                    height='14px'
                    viewBox='0 0 8 14'
                    fill='#'
                    className="-scale-x-100 group-hover:fill-amber-50 group-hover:text-white transition-colors duration-300"
                >
                    <path d='M1.3 0 8 7l-6.7 7L0 12.7 5.5 7 0 1.3z'/>
                </svg>
            </button>
            <button ref={nextRef}
                    className="group absolute w-10 h-10 top-1/3 right-4 z-10 -translate-y-1/2 bg-white hover:bg-orange-500 transition-colors duration-300 ease-in p-2 rounded-full flex items-center justify-center">
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='8px'
                    height='14px'
                    viewBox='0 0 8 14'
                    fill='#'
                    className="group-hover:fill-amber-50 group-hover:text-white transition-colors duration-300"
                >
                    <path d='M1.3 0 8 7l-6.7 7L0 12.7 5.5 7 0 1.3z'/>
                </svg>
            </button>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={2}
                slidesPerView={9}
                navigation={{
                    nextEl: nextRef.current,
                    prevEl: prevRef.current
                }}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
                onBeforeInit={(swiper) => {
                    // Привязываем кастомные кнопки
                    swiper.params.navigation.prevEl = prevRef.current
                    swiper.params.navigation.nextEl = nextRef.current
                }}
            >
                {data !== null && data.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard data={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}