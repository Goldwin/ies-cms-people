"use client";
import { SearchIcon } from "@/components/icons";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Avatar,
  Spinner,
  Input,
  User,
  Link,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { size } from "lodash";
import { useState } from "react";
import { Key } from "react-stately";

const columns = [
  // { key: "profilePictureUrl", label: "Profile Picture", searchable:false },
  //{ key: "id", label: "ID" },
  // { key: "firstName", label: "First Name", searchable:true},
  // { key: "middleName", label: "Middle Name", searchable:false},
  // { key: "lastName", label: "Last Name", searchable:false},
  { key: "name", label: "Name", searchable: false },
  { key: "phoneNumber", label: "Phone Number", searchable: false },
  { key: "address", label: "Address", searchable: false },
  { key: "gender", label: "Gender", searchable: false },
  // { key: "emailAddress", label: "Email Address", searchable:false},
  { key: "birthday", label: "Birthday", searchable: false },
  { key: "maritalStatus", label: "Marital Status", searchable: false },
];

const identicalMapping = (value: any) => value;
const birthdayMapping = (value: any) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  //return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
};

type ColumnMapping = {
  [key: string]: (value: any) => any;
};

const columnMapping: ColumnMapping = {
  profilePictureUrl: (value: string) => <Avatar src={value} />,
  id: identicalMapping,
  firstName: identicalMapping,
  middleName: identicalMapping,
  lastName: identicalMapping,
  gender: identicalMapping,
  emailAddress: identicalMapping,
  phoneNumber: identicalMapping,
  address: identicalMapping,
  birthday: birthdayMapping,
  maritalStatus: identicalMapping,
};

const getMapping = (person: Person, columnKey: Key) => {
  if (columnKey.toString() == "name") {
    return (
      <User
        description={
          <Link href={`/people/${person.id}`} size="sm">
            {person.emailAddress}
          </Link>
        }
        name={person.getFullName()}
        avatarProps={{ src: person.profilePictureUrl }}
      />
    );
  }
  return columnMapping[columnKey.toString()](getKeyValue(person, columnKey));
};

export default function PeoplePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<Person[]>([]);
  const [filteredRows, setFilteredRows] = useState<Person[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const onSearchChange = (value: string) => {
    const v = value.toLowerCase();
    if (value) {
      setFilterValue(value);
      setFilteredRows(
        rows.filter(
          (row) =>
            row.firstName.toLowerCase().includes(v) ||
            row.lastName.toLowerCase().includes(v)
        )
      );
    } else {
      setFilterValue("");
      setFilteredRows(rows);
    }
  };

  const search = () => {
    peopleService.search(
      { limit: 100, lastID: cursor },
      {
        onSuccess: function (v: Person[]): void {
          setRows(rows.concat(v));
          if (v.length > 0) {
            setHasMore(true);
            setCursor(v[v.length - 1].id);
            const newRows = rows.concat(v);
            setRows(newRows);
            setFilteredRows(
              newRows.filter((row) => {
                return (
                  !filterValue ||
                  row.firstName.includes(filterValue) ||
                  row.lastName.includes(filterValue)
                );
              })
            );
          } else {
            setHasMore(false);
          }
          setIsLoading(false);
        },
        onError: function (err: any): void {
          console.log(err);
        },
      }
    );
  };

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: () => {
      setIsLoading(true);
      search();
    },
  });

  return (
    <div className="flex flex-col gap-4 py-8 md:py-10 mx-10">
      <div className="w-full flex flex-row justify-start">
        <Input
          type="text"
          isClearable={true}
          className="w-full sm:max-w-[100%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
      </div>
      <div className="w-full flex flex-row justify-start">
        {rows.length} People
      </div>
      <Table
        layout="fixed"
        isHeaderSticky={true}
        aria-label="Church People"
        baseRef={scrollerRef}
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="white" />
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[800px]",
          table: "min-h-[600px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={filteredRows}
          isLoading={isLoading}
          loadingContent={<Spinner color="white" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <div className="flex justify-start">
                    {getMapping(item, columnKey)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}