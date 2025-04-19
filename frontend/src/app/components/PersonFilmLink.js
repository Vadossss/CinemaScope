"use client"

import React from "react";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";

import Link from "next/link";
import { useState } from "react";

export default function App({ data }) {
  const [openPopover, setOpenPopover] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover placement="right" open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Link className="focus:outline-none" href="#">
          <span
            className="text-xs hover:text-orange-600 transition delay-100 ease-in-out"
          >
            {data.name !== null ? data.name : data.enName}
          </span>
        </Link>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
        <div className="mb-2 flex justify-between gap-4">
          <div>
            <img className="h-[180px] rounded" src={data.photo}></img>
          </div>
          <div className="flex flex-col items-top">
            <div>
              <p className="font-bold text-lg">{data.name !== null ? data.name : data.enName}</p>
            </div>
            <div>
              <span className="font-light text-gray-500">{data.profession === "актеры" ? "Актёр" : data.profession === "актеры дубляжа" ? "Актёр дубляжа" : "Неизвестно"}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

