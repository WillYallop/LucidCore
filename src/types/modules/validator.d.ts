// Key: vali_


// Interfaces
interface vali_validateFieldResponse {
    valid: boolean
    value: string,
    method: string,
    errors: Array<core_errorMsg>
}
interface vali_validateFieldObj {
    value: string,
    method: string
}
interface vali_validateResponse {
    valid: boolean,
    fields: Array<vali_validateFieldResponse>
}