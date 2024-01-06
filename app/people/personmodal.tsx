import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import { SubmitHandler, useForm } from "react-hook-form";

const genders = ["Male", "Female"]
const maritalStatus = ["Single", "Married"]



export const PersonModal = ({isOpen, onOpenChange, person}:{isOpen:boolean, onOpenChange:()=>void, person?:Person}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<Person>(
        {
            mode:"onSubmit",            
        }
    )
    const onSubmit: SubmitHandler<Person> = (data) => peopleService.add(data, {
        onSuccess: function (v: Person):void {
            try {
                console.log(v)
            } catch(error) {
                error
            }			
        },
        onError: function (err: any): void {
            console.log(err)
        }
    })
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
                {(onClose)=>(
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">
                            {
                                person?"Update Profile":"Add Profile"
                            }
                        </ModalHeader>                        
                        <ModalBody className="gap-4">
                            <div className="flex flex-row gap-4">
                                <Input label="First Name" {...register("firstName")}/>
                                <Input label="Last Name" {...register("lastName")}/>                                
                            </div>
                            <div className="flex flex-row">
                                <Input label="Email Address" {...register("emailAddress")}/>
                            </div>
                            <div className="flex flex-col">
                                <Input label="Phone Number" {...register("phoneNumbers")}/>
                            </div>
                            <div className="flex flex-col">
                                <Input label="Address" {...register("address")}/>
                            </div>
                            <div className="flex flex-row gap-4">
                                <Input label="Birthday" type="date" placeholder="mm/dd/yyyy" {...register("birthday")}/>
                                <Input label="Anniversary" type="date" placeholder="mm/dd/yyyy" {...register("anniversary")}/>
                            </div>                                                        
                            <div className="flex flex-row gap-4">
                                <Select 
                                    label="Gender" {...register("gender")}
                                >
                                    {genders.map((gender) => (
                                        <SelectItem key={gender} value={gender.toUpperCase()}>
                                            {gender}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select 
                                    label="Marital Status"  
                                    {...register("maritalStatus")}
                                >
                                    {maritalStatus.map((status) => (
                                        <SelectItem key={status} value={status.toUpperCase()}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Update</Button>
                            <Button color="danger" onPress={onClose}>Cancel</Button>                            
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}