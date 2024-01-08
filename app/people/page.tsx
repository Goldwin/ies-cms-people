"use client"
import { title } from "@/components/primitives";
import { Address } from "@/entities/people/address";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

const columns = [
	{ key: "profilePictureUrl", label: "Profile Picture" },
	{ key: "firstName", label: "First Name" },
	{ key: "middleName", label: "Middle Name" },
	{ key: "lastName", label: "Last Name" },	
	{ key: "gender", label: "Gender" },
	{ key: "emailAddress", label: "Email Address" },
	{ key: "phoneNumber", label: "Phone Number" },
	{ key: "address", label: "Address" },
	{ key: "birthday", label: "Birthday" },
	{ key: "maritalStatus", label: "Marital Status" },
]

const identicalMapping = (value:any)=>value
const firstValueMapping = (value: any[])=>value[0]||""

type ColumnMapping = {
	[key:string]: (value:any) => any
}
const columnMapping: ColumnMapping = {
	"profilePictureUrl": (value:string)=><Avatar src={value} />, 
	"firstName": identicalMapping,
	"middleName": identicalMapping,
	"lastName": identicalMapping,
	"gender": identicalMapping,
	"emailAddress": identicalMapping,
	"phoneNumber": identicalMapping,
	"address": identicalMapping,
	"birthday": identicalMapping,
	"maritalStatus": identicalMapping
}

export default function PeoplePage() {
	const [isLoading, setIsLoading] = useState(true)	
	const rows = useRef<Person[]>([])
	useEffect(() => {
		if(isLoading) {
			peopleService.search({limit: 10, lastID: ""}, {
				onSuccess: function (v: Person[]): void {
					setIsLoading(false)
					rows.current = v
				},
				onError: function (err: any): void {
					console.log(err)
				}
			})
		}		
	})
	
	return (		
		<div>
			<Table aria-label="Example table with dynamic content">
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rows.current}>
				{(item) => (
				<TableRow key={item.id}>
					{(columnKey) => <TableCell>{columnMapping[columnKey.toString()](getKeyValue(item, columnKey))}</TableCell>}
				</TableRow>
				)}
			</TableBody>
			</Table>
		</div>		
	);
}
