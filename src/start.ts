import Application from './lib/application/Application'
import ProfileService from './service/ProfileService'
import MessageService from './service/MessageService'
const port = process.env.APP_PORT

new Application(
    [new ProfileService(), new MessageService()],
    port
)
