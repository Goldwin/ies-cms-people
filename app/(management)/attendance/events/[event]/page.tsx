"use client"
import { useParams } from "next/navigation";

export default function EventPage() {
    const param = useParams();
    return <div>Henlo, this is event {param.event}</div>;
}