const Util = {}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


// Maps over an object's properties and applies a transformation function to each function value
Util.mapProperties = (obj, callback) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            typeof value === 'function' ? callback(value) : value
        ])
    )

Util.mapObject = (obj, callback) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            value && typeof value === 'object' && !Array.isArray(value)
                ? callback(value)
                : value
        ])
    )

Util.mapObjects = (obj, callback) =>
    Util.mapObject(obj, inner =>
        Util.mapProperties(inner, callback)
    )

// Util.mapObjects = (obj, callback) => {
//     // apply to any function values at this level
//     const withFunctionsHandled = Util.mapProperties(obj, callback)

//     // recurse into object values
//     return Util.mapObject(withFunctionsHandled, value =>
//         Util.mapObjects(value, callback)
//     )
// }

module.exports = Util