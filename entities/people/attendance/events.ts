export class ChurchEvent {
    name: string | undefined 
    time: string | undefined

    constructor(obj: {name: string | undefined}) {
        this.name = obj.name
    }
}

export enum EventType {
    WEEKLY = "Weekly",
    ONE_TIME = "One Time"
}