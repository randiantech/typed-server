var mappers = {}

/**
 * Class responsible of handling resource property mapper. A Mapper is a <RESOURCE_NAME>.mapper.ts file that
 * contains information regarding the type of the field in the database (ie: if its varchar or bigint) and 
 * the name to which maps to (typically, the column name on a relational database). Other database specific 
 * fields would be added here in the future
 * 
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
export default class MapperProvider {
    /**
     * @param resourceName the name of the resource. For this value would be use <RESOURCE>.RESOURCE_NAME
     * @param mapper the <RESOURCE>.mapper.ts json file that contains the type and name information  
     */
    static add(resourceName, mapper) {
        mappers[resourceName] = mapper
    }

    /**
     * Given a field name -that it can be a dot separated one- resolves the mapper entry corresponding to it.
     * A mapper entry is a json value of type {type:<STRING>, name:<STRING>}
     * @param resourceName the name of the resource
     * @param fieldName the field name. It can be dot separated one, in example: personalInfo.name
     */
    static get(resourceName, fieldName) {
        let targetResource
        let mapper = mappers[resourceName]

        if (MapperProvider.isReservedFieldName(fieldName)) {
            return { type: '', name: fieldName }
        }

        //If fieldName contains ., that means its the property of a resource. It could be N number of sub
        //resources (in example, if the fieldName is 'personalInfo.bankInformation.id' we need to recursively
        //resolve id field of bankInformation mapper, referred by personalInfo mapper)  
        if (fieldName.indexOf('.') !== -1) {
            let separatorIndex = fieldName.indexOf('.')
            let subResourceName = fieldName.substring(0, separatorIndex - 1)
            let subFieldName = fieldName.substring(separatorIndex + 1, fieldName.length)

            return MapperProvider.get(subResourceName, subFieldName)
        }

        if (mapper.refers) {
            return MapperProvider.get(mapper.refers, fieldName)
        } else {
            return mapper[fieldName]
        }
    }

    /**
     * Checks whether or not the field name is a reserved one. A reserved word does not require a map entry,
     * since typing information is not required to create the query
     * @param fieldName The field name
     */
    static isReservedFieldName(fieldName) {
        return fieldName === 'page' || fieldName === 'page_size'
    }
}
