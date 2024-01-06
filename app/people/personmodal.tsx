import { Person } from "@/entities/people/person";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"

const genders = ["Male", "Female"]

export const PersonModal = ({isOpen, onOpenChange, person}:{isOpen:boolean, onOpenChange:()=>void, person?:Person}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
                {(onClose)=>(
                    <form>
                        <ModalHeader className="flex flex-col gap-1">
                            {
                                person?"Update Profile":"Add Profile"
                            }
                        </ModalHeader>                        
                        <ModalBody className="gap-4">
                            <div className="flex flex-row gap-4">
                                <Input label="First Name" />
                                <Input label="Last Name" />                                
                            </div>
                            <div className="flex flex-row">
                                <Input label="Email Address"/>
                            </div>
                            <div className="flex flex-col">
                                <Input label="Phone Number"/>
                            </div>
                            <div className="flex flex-col">
                                <Input label="Address"/>
                            </div>
                            <div className="flex flex-row gap-4">
                                <Input label="Birthday" type="date" placeholder="mm/dd/yyyy" />
                                <Input label="Anniversary" type="date" placeholder="mm/dd/yyyy" />
                            </div>                                                        
                            <div className="flex flex-row gap-4">
                                <Select 
                                    label="Gender" 
                                >
                                    {genders.map((gender) => (
                                        <SelectItem key={gender} value={gender.toUpperCase()}>
                                            {gender}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select 
                                    label="Marital Status"  
                                >
                                    {genders.map((gender) => (
                                        <SelectItem key={gender} value={gender.toUpperCase()}>
                                            {gender}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>Update</Button>
                            <Button color="danger" onPress={onClose}>Cancel</Button>                            
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}