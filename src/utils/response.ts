export function apiResponse (data:any, success=true, message:any = null){
    return {
        status: success ? 'SUCCESS' : 'ERROR',
        message,
        data
    }
}