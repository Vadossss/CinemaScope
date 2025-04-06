"use client"

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button
} from "@heroui/react";
import { useState, useEffect } from "react";

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

const items = [
    {
        key: "profile",
        label: "Мой профиль",
    },
    {
        key: "grades",
        label: "Оценки",
    },
    {
        key: "settings",
        label: "Настройки",
    },
    {
        key: "logout",
        label: "Выйти",
    },
];

const navbarItems = [
    { value: "catalog", name: "Каталог" },
    { value: "catalog", name: "Каталог" }
]

let source = "http://localhost:8085";

export default function App() {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState(false);

    useEffect(() => {
        const checkMe = async () => {
            try {
                const res = await fetch(source + "/auth/me",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                if (res.ok) {
                    const data = await res.text();
                    setUsername(data);
                    setAuth(true);
                }
                else {
                    console.log("здесь");

                }
            } catch (error) {
                console.log(error);
            }
        }
        checkMe();
    }, []);


    return (
        <Navbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <AcmeLogo />
                    <p className="hidden sm:block font-bold text-inherit">CSP</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Каталог
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link aria-current="page" color="secondary" href="#">
                            Персоны
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Медиа
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[20rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper:
                            "h-full font-normal text-black bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Фильмы, сериалы, персоны"
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                />
                {!auth ? (<NavbarItem>
                    <Button as={Link} color="primary" href="/auth" variant="flat">
                        Войти
                    </Button>
                </NavbarItem>) : (<Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name={username}
                            size="sm"
                            src="icon_avatar1.png"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (
                            <DropdownItem
                                key={item.key}
                                className={item.key === "logout" ? "text-danger" : ""}
                                color={item.key === "logout" ? "danger" : "default"}
                            >
                                {item.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>)}
            </NavbarContent>
        </Navbar>
    );
}
