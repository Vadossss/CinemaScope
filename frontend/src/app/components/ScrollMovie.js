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
            <button ref={prevRef} className="absolute w-10 h-10 left-0 top-1/3 z-10 -translate-y-1/2 bg-white p-1 rounded-full flex items-center justify-center">
                <img className="-scale-100" src="icon_next.svg"></img>
            </button>
            <button ref={nextRef} className="absolute w-10 h-10 right-0 top-1/3 z-10 -translate-y-1/2 bg-white p-2 rounded-full flex items-center justify-center">
                <img src="icon_next.svg"></img>
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