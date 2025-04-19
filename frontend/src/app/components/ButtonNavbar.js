"use client"

import {
    NavbarItem,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Button,
    User,
    Spinner
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import Link from "next/link";

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


let source = "http://localhost:8085";

export default function App() {
    const { auth, username } = useAuth();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (auth !== null) {
            setLoading(false);
        }
    }, [auth]);

    if (isLoading) {
        return (
            <div>
                <Spinner color="default" />
            </div>
        )
    }

    return (
        <>
            {!auth ? (<NavbarItem>
                <Button as={Link} color="primary" href="/auth" variant="flat">
                    Войти
                </Button>
            </NavbarItem>) : (<Dropdown placement="bottom-center">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            src: "/icon_avatar1.png",
                        }}
                        className="transition-transform"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem key="me" isReadOnly className="h-12 gap-2 opacity-100">
                        <User
                            avatarProps={{
                                size: "sm",
                                src: "icon_avatar1.png",
                            }}
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                            name={`${username}`}
                        />
                    </DropdownItem>
                    {items.map((item) => (
                        <DropdownItem
                            key={item.key}
                            className={item.key === "logout" ? "text-danger" : ""}
                            color={item.key === "logout" ? "danger" : "default"}
                        >
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>)}
        </>
    );
}
