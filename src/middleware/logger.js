export const logger = (store) => (next) => (action) => {
    console.group(action.type)
        next(action)   
        console.log('State is now ', store.getState())
    console.groupEnd()
}