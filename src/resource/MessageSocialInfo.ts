import Factory from '../lib/common/Factory'

/**
 * MessageSocialInfo object
 * //TODO This is not a resource indeed, it would be somewhere else to clearly state that
 */
export default class MessageSocialInfo implements Factory<MessageSocialInfo> {

    private likeCounter: number;
    private loveCounter: number;
    private funCounter: number;
    private wowCounter: number;
    private sadCounter: number;
    private angryCounter: number;
    private reportCounter: number;


    /**
     * constructor
     * @param likeCounter # of times message has been marked as like
     * @param loveCounter # of times message has been marked as love
     * @param funCounter # of times message has been marked as fun
     * @param wowCounter # of times message has been marked as wow
     * @param sadCounter # of times message has been marked as sad
     * @param angryCounter # of times message has been marked as angry
     * @param reportCounter # of times message has been reported
     */
    constructor(likeCounter: number, loveCounter: number, funCounter: number, wowCounter: number, sadCounter: number, angryCounter: number, reportCounter: number) {
        this.validate({ likeCounter, loveCounter, funCounter, wowCounter, sadCounter, angryCounter, reportCounter })
        this.likeCounter = likeCounter;
        this.loveCounter = loveCounter;
        this.funCounter = funCounter;
        this.wowCounter = wowCounter;
        this.sadCounter = sadCounter;
        this.angryCounter = angryCounter;
        this.reportCounter = reportCounter;
    }

    /**
     * Attempts to create a MessageSocialInfo object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of MessageSocialInfo class
     * @returns {MessageSocialInfo} instance of MessageSocialInfo class
     */
    create(obj: any): MessageSocialInfo {
        return MessageSocialInfo.create(obj)
    }

    /**
     * Attempts to create a MessageSocialInfo object from given plain javascript object input
     * @param obj the object from which it will be tried to be constructed an instance of MessageSocialInfo class
     * @returns {MessageSocialInfo} instance of MessageSocialInfo class
     */
    static create(obj: any): MessageSocialInfo {
        return new MessageSocialInfo(
            parseInt(obj.likecounter), 
            parseInt(obj.lovecounter), 
            parseInt(obj.funcounter), 
            parseInt(obj.wowcounter), 
            parseInt(obj.sadcounter), 
            parseInt(obj.angrycounter), 
            parseInt(obj.reportcounter))
    }

    validate(obj: any) {
        return MessageSocialInfo.validate(obj)
    }

    static validate(obj: any) {
        return
    }
}