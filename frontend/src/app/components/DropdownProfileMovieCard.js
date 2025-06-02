"use client"

import React, {useEffect} from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import {useCategories} from "@/app/contexts/categoriesMoviesContext";

export default function App({categoryName, setCategoryName}) {
    const statusLabels = {
        watching: "Смотрю",
        planned: "В планах",
        watched: "Просмотрено",
        dropped: "Брошено",
    };

    const { categories, setCategories, category, setCategory } = useCategories();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([categoryName]));

    const selectedValue = React.useMemo(() => {
        const key = Array.from(selectedKeys)[0];
        return statusLabels[key];
    }, [selectedKeys]);

    useEffect(() => {
        setCategory(Array.from(selectedKeys)[0]);
    }, [selectedValue])

    console.log(categoryName);

    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm opacity-60">Список</div>
            <Dropdown>
                <DropdownTrigger>
                    <Button className="font-bold" variant="bordered">
                        {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="dropdown"
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="shadow"
                    onSelectionChange={setSelectedKeys}
                >
                    <DropdownItem key="watching">Смотрю</DropdownItem>
                    <DropdownItem key="planned">В планах</DropdownItem>
                    <DropdownItem key="watched">Просмотренно</DropdownItem>
                    <DropdownItem key="dropped">Брошено</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

