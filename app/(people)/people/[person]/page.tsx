"use client";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Button,
  Card,
  CardBody,
  Link,
  Skeleton,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PersonHeader } from "./header";
import { PersonMenu } from "./menu";
import { PersonModal } from "@/components/people/person/personmodal";
import { UpdateHouseholdModal } from "@/components/people/household/updatehouseholdmodal";
import {
  BirthdayIcon,
  EmailIcon,
  GenderIcon,
  LocationIcon,
  PhoneIcon,
} from "@/components/icons";
import { Household } from "@/entities/people/household";

export default function PersonPage() {
  const param = useParams();
  const [person, setPerson] = useState<Person | undefined>();
  const [household, setHousehold] = useState<Household | undefined>();
  const {
    isOpen: isPersonOpen,
    onOpen: onPersonOpen,
    onOpenChange: onPersonOpenChange,
  } = useDisclosure();
  const {
    isOpen: isHouseholdOpen,
    onOpen: onHouseholdOpen,
    onOpenChange: onHouseholdChange,
  } = useDisclosure();
  useEffect(() => {
    peopleService.get(param.person as string, {
      onSuccess: (person) => {
        setPerson(person);
      },
      onError: (error) => {},
    });
    peopleService
      .getHousehold(param.person as string)
      .then((household) => {
        setHousehold(household);
      })
      .catch((error) => {
        console.log("error when getting household", error);
      });
  }, [param.person]);
  return (
    <>
      <PersonModal
        isOpen={isPersonOpen}
        onOpenChange={onPersonOpenChange}
        person={person}
        callback={(person) => {
          setPerson(person);
        }}
      />
      {household && (
        <UpdateHouseholdModal
          isOpen={isHouseholdOpen}
          onOpenChange={onHouseholdChange}
          household={household}
        />
      )}

      <PersonHeader person={person} />
      <div className="grid grid-cols-6 items-center justify-center divide-x h-full">
        <PersonMenu id={param.person as string} focus="Profile" />
        <section className="col-start-2 col-end-7 items-start justify-start gap-4 py-8 md:py-10 px-4 h-full w-full flex flex-row">
          <Skeleton isLoaded={!!person} className="w-[70%]">
            <Card className="w-full">
              <CardBody className="gap-8">
                <div className="gap-4 flex flex-col">
                  <div className="flex flex-row justify-between">
                    <h1 className="text-xl">Contact Information</h1>
                    <Button color="primary" size="sm" onPress={onPersonOpen}>
                      Edit
                    </Button>
                  </div>
                  <div className="gap-4 grid grid-cols-7 w-96">
                    <p className="text-foreground-500 col-span-2 flex gap-1">
                      <EmailIcon />
                      Email
                    </p>
                    <p className="col-span-5">
                      {person?.emailAddress ? person.emailAddress : "N/A"}
                    </p>

                    <p className="text-foreground-500 flex gap-1 col-span-2">
                      <PhoneIcon /> Phone
                    </p>
                    <p className="col-span-5">
                      {person?.phoneNumber ? person?.phoneNumber : "N/A"}
                    </p>

                    <p className="text-foreground-500 flex gap-1 col-span-2">
                      <LocationIcon />
                      Address
                    </p>
                    <p className="words-break col-span-5">
                      {person?.address ? person?.address : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="gap-4 flex flex-col">
                  <div className="flex flex-row justify-between">
                    <h1 className="text-xl">Personal Information</h1>
                  </div>
                  <div className="gap-4 grid grid-cols-7 w-96">                    
                      <p className="text-foreground-500 flex gap-1 col-span-2">
                        <GenderIcon /> Gender
                      </p>
                      <p className="col-span-5">{person?.gender ? person?.gender : "N/A"}</p>
                      <p className="text-foreground-500 flex gap-1 col-span-2">
                        <BirthdayIcon /> Birthday
                      </p>
                      <p className="col-span-5">
                        {person?.birthday ? person?.getBirthdayString() : "N/A"}
                      </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Skeleton>
          <Skeleton isLoaded={!!household} className="w-[30%]">
            <Card className="w-full">
              <CardBody className="gap-8">
                <div className="gap-4 flex flex-col">
                  <div className="flex flex-row justify-between">
                    <h1 className="text-xl">{household?.name} Household</h1>
                    <Button color="primary" size="sm" onPress={onHouseholdOpen}>
                      Edit
                    </Button>
                  </div>
                  <div>
                    <Link
                      href={`/people/${household?.householdHead.id}`}
                      color="foreground"
                      className="hover:text-primary"
                    >
                      <User
                        name={household?.householdHead.getFullName()}
                        avatarProps={{
                          src: household?.householdHead.profilePictureUrl,
                        }}
                        description={
                          <p className="text-foreground-500">
                            {household?.householdHead.gender}
                          </p>
                        }
                      />
                    </Link>
                  </div>
                  {household?.members.length &&
                    household.members.length > 0 &&
                    household?.members.map((member) => (
                      <div key={member.id}>
                        <Link
                          href={`/people/${member.id}`}
                          color="foreground"
                          className="hover:text-primary"
                        >
                          <User
                            name={member.getFullName()}
                            avatarProps={{ src: member.profilePictureUrl }}
                            description={
                              <p className="text-foreground-500">
                                {member.gender}
                              </p>
                            }
                          />
                        </Link>
                      </div>
                    ))}
                </div>
              </CardBody>
            </Card>
          </Skeleton>
        </section>
      </div>
    </>
  );
}
