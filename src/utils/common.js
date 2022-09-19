export const responseFormat = (data, status = 200, message = 'success') => {
    return {
        status,
        message,
        data
    }
}