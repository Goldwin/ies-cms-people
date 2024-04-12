export class ChurchEvent {
    id: string
    name: string | undefined 
    time: string | undefined

    constructor(obj: {id: string, name: string | undefined}) {
        this.id = obj.id
        this.name = obj.name
    }
}

export enum EventType {
    WEEKLY = "Weekly",
    ONE_TIME = "One Time"
}