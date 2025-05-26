"use client"

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Button,
} from "@heroui/react";
import Link from "next/link";
import ButtonNavbar from "@/app/components/ButtonNavbar";
import NavbarSearch from "@/app/components/NavbarSearch";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={height || size}
            role="presentation"
            viewBox="0 0 24 24"
            width={width || size}
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export const ChevronDown = ({ fill, size, height, width, ...props }) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
};

export default function App() {
    return (
        <Navbar isBordered className="bg-white">
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link className="flex items-center" href="/">
                        <AcmeLogo />
                        <p className="hidden sm:block font-bold text-inherit">CSP</p>
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3" justify="center">
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="text-base text-gray-500 font-bold transition ease-in-out delay-100 hover:text-black duration-150 p-0 text-base bg-transparent data-[hover=true]:bg-transparent"
                                    radius="sm"
                                    endContent={icons.chevron}
                                    variant="light"
                                >
                                    Каталог
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="ACME features"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >
                            <DropdownItem
                                key="autoscaling"
                            >
                                Кино
                            </DropdownItem>
                            <DropdownItem
                                key="usage_metrics"
                            >
                                Сериалы
                            </DropdownItem>
                            <DropdownItem
                                key="production_ready"
                            >
                                Аниме
                            </DropdownItem>
                            <DropdownItem
                                key="99_uptime"
                            >
                                Мультфильмы
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavbarItem>
                        <Link className="text-base text-gray-500 font-bold transition ease-in-out delay-100 hover:text-black duration-150" href="#">
                            Персоны
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="text-base text-gray-500 font-bold transition ease-in-out delay-100 hover:text-black duration-150" href="#">
                            Медиа
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <NavbarSearch />
                <ButtonNavbar />
            </NavbarContent>
        </Navbar>
    );
}
