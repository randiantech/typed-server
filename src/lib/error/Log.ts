import AppLogEntry from './AppLogEntry'

export default function Log(err:any) {
    if(err instanceof AppLogEntry){
        return err.toJSON()
    } else {
        return (<AppLogEntry>err).toJSON()
    }
}
