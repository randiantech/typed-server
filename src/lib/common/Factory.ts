/**
 * Interface to be implemented for members capable of construct objects
 */
interface Factory<T> {
    
    /**
     * Creates an instance of type T using provided plain javascript object
     * @param obj the object used to construct an instance of T
     */
    create(obj: any): T
}

export default Factory