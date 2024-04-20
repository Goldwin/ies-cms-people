export class ChurchEvent {
    id: string
    name: string | undefined 
    eventType: EventType
    time: string | undefined

    constructor({id, name, eventType, time}: {id: string, name: string | undefined, eventType: EventType, time: string | undefined}) {
        this.id = id
        this.name = name
        this.eventType = eventType
    }
}

export class ChurchEventSession {
    
}

export class ChurchEventSessionStats {
    id: string
    date: string
    attendanceCount: number

    constructor({id, date, attendanceCount}:{id: string, date: string, attendanceCount: number}) {
        this.id = id
        this.date = date
        this.attendanceCount = attendanceCount
    }
}

export class ChurchEventStats {
    id: string
    name: string
    sessions: ChurchEventSessionStats[]

    constructor({id, name, sessions}:{id: string, name: string, sessions: ChurchEventSessionStats[]}) {
        this.id = id
        this.name = name
        this.sessions = sessions
    }

    get dateLabels(): string[] {
        return this.sessions.map((session) => session.date)
    }

    get attendanceCount(): number[] {
        return this.sessions.map((session) => session.attendanceCount)
    }

    get totalAttendanceCount(): number {
        return this.sessions.reduce((total, session) => total + session.attendanceCount, 0)
    }
}

export enum EventType {
    WEEKLY = "Weekly",
    ONE_TIME = "One Time"
}