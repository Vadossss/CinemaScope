"use client"

import {AuthProvider} from "@/app/contexts/authContext";
import Navbar from "@/app/components/Navbar";
import {HeroUIProvider} from "@heroui/react";
import Footer from "@/app/components/Footer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect} from "react";

export default function App({children}) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Navbar />
                <HeroUIProvider>
                    <div className="mt-6 flex flex-col items-center min-h-[calc(96vh-4rem)]">{children}</div>
                    <Footer />
                </HeroUIProvider>
            </AuthProvider>
        </QueryClientProvider>
    )

}