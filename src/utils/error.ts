// ESLog -> console
const errorCaptured = (err: any, vm: any, info: any) => {
    console.log("ERROR!", 'name:' + err.name)
    console.log("ERROR!", 'message:' + err.message)
    console.log("ERROR!", 'stack:' + err.stack)
}
export { errorCaptured }