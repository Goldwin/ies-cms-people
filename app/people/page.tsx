"use client"
import { title } from "@/components/primitives";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const columns = [
	{ key: "profilePictureUrl", label: "Profile Picture" },
	{ key: "firstName", label: "First Name" },
	{ key: "middleName", label: "Middle Name" },
	{ key: "lastName", label: "Last Name" },	
	{ key: "gender", label: "Gender" },
	{ key: "emailAddress", label: "Email Address" },
	{ key: "phoneNumbers", label: "Phone Numbers" },
	{ key: "addresses", label: "Addresses" },
	{ key: "birthday", label: "Birthday" },
	{ key: "maritalStatus", label: "Marital Status" },
]

const rows = [
	{
		id: 'c9d2848c-1f7a-4d6e-bdba-8bbeba4bea77',
		firstName: 'Hutomo',
		middleName: '',
		lastName: 'Widjaja',
		profilePictureUrl: '',
		addresses: [],
		phoneNumbers: [],
		emailAddress: 'flame.rainHbow@gmail.com',
		maritalStatus: '',
		birthday: null
	  }	  
]

export default function PeoplePage() {
	return (
		<div>
			<Table aria-label="Example table with dynamic content">
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rows}>
				{(item) => (
				<TableRow key={item.id}>
					{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
				</TableRow>
				)}
			</TableBody>
			</Table>
		</div>		
	);
}
