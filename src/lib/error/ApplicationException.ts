/**
 * Application Exception
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class ApplicationException {
    date: string;
    description: string;
    stack: string;

    /**
     * constructor
     * @param description a description of the exception event
     * @param stack an optional stack trace to be attached to generated HAL error representation
     */
    constructor(description: string, stack?: string) {
        this.date = new Date().toISOString();
        this.description = description;
        this.stack = stack;
    }

    /**
     * Returns a HAL representation of the exception
     * @returns {{date: string, description: string, stack: string, _links: {}, _embedded: {}}}
     */
    toHal() {
        return {
            date: this.date,
            description: this.description,
            stack: `${this.stack ? this.stack : 'N/A'}`,
            _links: {},
            _embedded: {}
        }
    }
}