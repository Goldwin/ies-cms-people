"use client";
import { HouseholdInfo } from "@/entities/attendance/person";
import { householdQuery } from "@/lib/queries/attendance/household";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { debounce } from "lodash";
import { useState } from "react";

export interface HouseholdPickerProp {
  onHouseholdSelected?: (household: HouseholdInfo) => void;
}

export function HouseholdPicker(prop: Readonly<HouseholdPickerProp>) {
  const [householdList, setHouseholdList] = useState<HouseholdInfo[]>([]);
  const [householdMap, setHouseholdMap] = useState<{
    [key: string]: HouseholdInfo;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onInputChange = debounce((value: string) => {
    if (value?.length < 3) {
      setHouseholdList([]);
      setHouseholdMap({});
      setIsLoading(false);
      return;
    }
    householdQuery
      .listHouseholds({ name: value, limit: 200 })
      .then((householdList) => {
        setHouseholdList(householdList);
        setHouseholdMap(
          householdList.reduce(
            (
              acc: { [key: string]: HouseholdInfo },
              household: HouseholdInfo
            ) => {
              acc[household.id] = household;
              return acc;
            },
            {}
          )
        );
        setIsLoading(false);
      });
  }, 1000);

  return (
    <Autocomplete
      className="flex w-[60%]"
      size="lg"
      label=""
      placeholder="Search person by name"
      items={householdList}
      aria-label="Search Person"
      onInputChange={(value) => {
        setIsLoading(true);
        onInputChange(value);
      }}
      onSelectionChange={(value) => {
        if (householdMap?.[value]) {
          prop.onHouseholdSelected?.(householdMap[value]);
        }
      }}
      isLoading={isLoading}
    >
      {(household) => (
        <AutocompleteItem
          value={household.id}
          key={household.id}
          textValue={household.name}
        >
          <div className="flex flex-col">
            <div>
              <h1 className="text-l font-medium">{`${household.name} household`}</h1>
            </div>
            <p className="font-light">
              {household.members.reduce(
                (a, b) => `${a}, ${b.fullName}`,
                household.householdHead.fullName
              )}
            </p>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
