import AppLogType from './AppLogType'

export default class AppLogEntry {
    type: AppLogType;
    date: string;
    description: string;
    stack: string;

    constructor(type:AppLogType, description:string, stack?:string){
        this.type = type;
        this.date = new Date().toISOString();
        this.description = description;
        this.stack = stack;
    }

    getLogType(id:AppLogType){
        switch(id){
            case AppLogType.DEBUG: return 'DEBUG';
            case AppLogType.ERROR: return 'ERROR';
            case AppLogType.INFO: return 'INFO';
            case AppLogType.WARNING: return 'WARNING';
        }
    }

    toJSON(){
        return {
            type: this.getLogType(this.type),
            date: this.date,
            description: this.description,
            stack: `${this.stack ? this.stack : 'N/A'}`
        }
    }
}