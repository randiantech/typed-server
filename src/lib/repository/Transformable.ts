interface Transformable<T> {
    transform(obj: any): T
    validate(obj:any)
}

export default Transformable