"use client"
import { title } from "@/components/primitives";
import { Address } from "@/entities/people/address";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar, Spinner} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useEffect, useRef, useState } from "react";

const columns = [
	{ key: "profilePictureUrl", label: "Profile Picture" },
	{ key: "id", label: "ID" },
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
	"id": identicalMapping,
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
	const [rows, setRows] = useState<Person[]>([])
	const [cursor,setCursor] = useState<string>("")
	const [hasMore, setHasMore] = useState(true);
	
	const [loaderRef, scrollerRef] = useInfiniteScroll({hasMore, onLoadMore: 
		() => {
			console.log("what")
			setIsLoading(true)
			peopleService.search({limit: 10, lastID: cursor}, {
				onSuccess: function (v: Person[]): void {
					setRows(rows.concat(v))					
					if(v.length > 0) {						
						setHasMore(true)						
						setCursor(v[v.length-1].id)
						setRows(rows.concat(v))
					} else {
						setHasMore(false)						
					}					
					setIsLoading(false)
				},
				onError: function (err: any): void {
					console.log(err)
				}
			})
		}});
	
	return (		
		<div>
			<Table isHeaderSticky={true} aria-label="Example table with dynamic content" baseRef={scrollerRef} bottomContent={
				hasMore ? 
				<div className="flex w-full justify-center">
					<Spinner ref={loaderRef} color="white" />
			  	</div> : null				
			}
			classNames={{
				base: "max-h-[600px] overflow-scroll",
				table: "min-h-[500px]",
			  }}
			>		
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rows} isLoading={isLoading} loadingContent={<Spinner color="white" />}>
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
