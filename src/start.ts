import Application from './lib/application/Application'
import ProfileService from './service/ProfileService'
import MessageService from './service/MessageService'
import TrendingService from './service/TrendingService'
import MapperProvider from './lib/mapper/MapperProvider'

import MessageMapper from './resource/mappers/Message.mapper'
import TrendingMapper from './resource/mappers/Trending.mapper'
import MessageSocialInfoMapper from './resource/mappers/MessageSocialInfo.mapper'
import PersonalInfoMapper from './resource/mappers/PersonalInfo.mapper'
import ProfileMapper from './resource/mappers/Profile.mapper'

import Message from './resource/Message'
import MessageSocialInfo from './resource/MessageSocialInfo'
import PersonalInfo from './resource/PersonalInfo'
import Profile from './resource/Profile'
import Trending from './resource/Trending'

const port = process.env.APP_PORT
const apiVersion = 2
const host = `http://localhost:3000/`


MapperProvider.add(Message.name, MessageMapper)
MapperProvider.add(Trending.name, TrendingMapper)
MapperProvider.add(MessageSocialInfo.name, MessageSocialInfoMapper)
MapperProvider.add(PersonalInfo.name, PersonalInfoMapper)
MapperProvider.add(Profile.name, ProfileMapper)


new Application(
    [new ProfileService(), new MessageService(), new TrendingService()],
    port,
    apiVersion,
    host
)
