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
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import Link from "next/link";
import {useRouter} from "next/navigation";

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

export default function App() {
    const { auth, username, userId, avatar, setAuth, role } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const router  = useRouter();

    useEffect(() => {
        if (auth !== null) {
            setLoading(false);
        }
    }, [auth]);

    const handleLogout = async () => {
        router.push("/")
        setAuth(false);
        await fetch('http://localhost:8085/auth/logout', { method: 'POST', credentials: "include" });
        // return (
        //     <div className="w-[1600px] h-screen bg-white flex justify-center rounded-xl items-center">
        //         <Spinner color="warning" />
        //     </div>
        // )
    };

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
                            src: avatar !== null ? avatar : "/icon_avatar1.png",
                        }}
                        className="transition-transform"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem key="me" isReadOnly className="h-12 gap-2 opacity-100">
                        <User
                            avatarProps={{
                                size: "sm",
                                src: avatar !== null ? avatar : "/icon_avatar1.png",
                            }}
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                            name={`${username}`}
                        />
                    </DropdownItem>
                    {role === "ROLE_ADMIN" && (
                        <DropdownItem  href="/admins">
                            Admin
                        </DropdownItem>
                        )}
                    {items.map((item) => (
                        <DropdownItem
                            key={item.key}
                            className={item.key === "logout" ? "text-danger" : ""}
                            color={item.key === "logout" ? "danger" : "default"}
                            onPress={() => item.key === "logout" && handleLogout()}
                        >
                            <Link href={item.key === 'profile' ? `/user/${userId}` : '#'}>
                                {item.label}
                            </Link>
                        </DropdownItem>
                    ))}
                    
                </DropdownMenu>
            </Dropdown>)}
            
        </>
    );
}