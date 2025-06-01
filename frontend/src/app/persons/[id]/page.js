"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import PersonPage from "@/app/components/PersonPage";
import { fetchGetPersonByID } from "@/app/utils/fetchGetPersonByID";

export default function App() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  return <PersonPage person={person} />;
}