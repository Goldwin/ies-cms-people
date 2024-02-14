"use client";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
import { CreateHouseholdModal } from "@/components/people/household/createhouseholdmodal";

const HouseholdCard = ({
  household,
  onHouseholdOpen,
}: {
  household?: Household;
  onHouseholdOpen: () => void;
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between">
        <h1 className="text-xl">{household?.name} Household</h1>
        <Button color="primary" size="sm" onPress={onHouseholdOpen}>
          Edit
        </Button>
      </CardHeader>
      <CardBody className="gap-8">
        <div className="gap-4 flex flex-col">
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
          {household &&
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
                      <p className="text-foreground-500">{member.gender}</p>
                    }
                  />
                </Link>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

const NoHouseholdCard = ({
  person,
  onHouseholdOpen,
}: {
  person?: Person;
  onHouseholdOpen: () => void;
}) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row justify-between">
      <h1 className="text-xl">Household</h1>
    </CardHeader>
    <CardBody className="gap-8 flex flex-col justify-center items-center">
      <div className="gap-4 flex flex-col w-10/12 items-center">
        <p className="text-center">
          {person?.getFullName()} has not been added to a household yet
        </p>
        <Link
          className="text-center text-small"
          href="#"
          onPress={onHouseholdOpen}
        >
          Create One
        </Link>
      </div>
    </CardBody>
  </Card>
);

export default function PersonPage() {
  const param = useParams();
  const [person, setPerson] = useState<Person | undefined>();
  const [household, setHousehold] = useState<Household | undefined>();
  const [isHouseholdLoading, setIsHouseholdLoading] = useState<boolean>(true);
  const {
    isOpen: isPersonOpen,
    onOpen: onPersonOpen,
    onOpenChange: onPersonOpenChange,
  } = useDisclosure();
  const {
    isOpen: isHouseholdUpdateModalOpen,
    onOpen: onHouseholdUpdateModalOpen,
    onOpenChange: onHouseholdUpdateModalChange,
  } = useDisclosure();

  const {
    isOpen: isHouseholdCreationModalOpen,
    onOpen: onHouseholdCreationModalOpen,
    onOpenChange: onHouseholdCreationModalChange,
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
        if (household) setHousehold(household);
        setIsHouseholdLoading(false);
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
          isOpen={isHouseholdUpdateModalOpen}
          onOpenChange={onHouseholdUpdateModalChange}
          household={household}
          onSuccess={(household: Household) => {
            setHousehold(household);
          }}
        />
      )}

      {!household && (
        <CreateHouseholdModal
          householdHead={person}
          isOpen={isHouseholdCreationModalOpen}
          onOpenChange={onHouseholdCreationModalChange}
          onSuccess={(household: Household) => {
            setHousehold(household);
          }}
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
                    <p className="col-span-5">
                      {person?.gender ? person?.gender : "N/A"}
                    </p>
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
          <Skeleton isLoaded={!isHouseholdLoading} className="w-[30%]">
            {household && (
              <HouseholdCard
                household={household}
                onHouseholdOpen={onHouseholdUpdateModalOpen}
              />
            )}
            {!household && (
              <NoHouseholdCard
                person={person}
                onHouseholdOpen={onHouseholdCreationModalOpen}
              />
            )}
          </Skeleton>
        </section>
      </div>
    </>
  );
}
