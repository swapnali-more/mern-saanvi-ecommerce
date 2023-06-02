export const apiCall = async (url = "", data = {}, method = "") => {
    let options: any = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(options.method === "POST" || options.method === "PUT"){
        options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options)
    return response.json()
}
