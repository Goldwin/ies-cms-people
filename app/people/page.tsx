"use client"
import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Address } from "@/entities/people/address";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar, Spinner, Input} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useEffect, useRef, useState } from "react";

const columns = [
	{ key: "profilePictureUrl", label: "Profile Picture", searchable:false },
	//{ key: "id", label: "ID" },
	{ key: "firstName", label: "First Name", searchable:true},
	{ key: "middleName", label: "Middle Name", searchable:false},
	{ key: "lastName", label: "Last Name", searchable:false},	
	{ key: "gender", label: "Gender", searchable:false},
	{ key: "emailAddress", label: "Email Address", searchable:false},
	{ key: "phoneNumber", label: "Phone Number", searchable:false},
	{ key: "address", label: "Address", searchable:false},
	{ key: "birthday", label: "Birthday", searchable:false},
	{ key: "maritalStatus", label: "Marital Status", searchable:false},
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
			setIsLoading(true)
			peopleService.search({limit: 20, lastID: cursor}, {				
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
		<div className="flex flex-col items-center gap-4 py-8 md:py-10 mx-10">
			<div className="w-full flex flex-row justify-start"><Input
				isClearable
				className="w-full sm:max-w-[44%]"
				placeholder="Search by name..."
				startContent={<SearchIcon />}
				// value={filterValue}
				// onClear={() => onClear()}
				// onValueChange={onSearchChange}
          	/></div>
			<div className="w-full flex flex-row justify-start">{rows.length} People</div>
			<Table layout="fixed" isHeaderSticky={true} aria-label="Church People" baseRef={scrollerRef} bottomContent={
				hasMore ? 
				<div className="flex w-full justify-center">
					<Spinner ref={loaderRef} color="white" />
			  	</div> : null				
			}
			classNames={{
				base: "max-h-[800px]",
				table: "min-h-[600px]",
			  }}
			>		
			<TableHeader columns={columns}>
				{(column) => 
					<TableColumn key={column.key}>
						{column.label}					
					</TableColumn>
				}
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
