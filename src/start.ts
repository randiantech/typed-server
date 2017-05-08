import Application from './lib/application/Application'
import ProfileService from './service/ProfileService'
import MessageService from './service/MessageService'
const port = process.env.APP_PORT
const apiVersion = 2
const host = 'http://myApiHost.com/'

new Application(
    [new ProfileService(), new MessageService()],
    port,
    apiVersion,
    host
)
