"use client";
import peopleService from "@/services/people";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PersonPage() {
  const param = useParams();
  useEffect(() => {
    peopleService.get(param.person as string, {
      onSuccess: (person) => {
        console.log(person);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  });
  return (
    <div>
      <h1>{param.person}</h1>
    </div>
  );
}
