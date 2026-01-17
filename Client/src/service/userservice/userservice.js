import axiosinstance from "../axioinstance"

export const createUser = async(data) =>{
    let response = await axiosinstance.post("/create",data)
    return response.data
}


export const loginuser =  async(data) =>{
    let response = await axiosinstance.post("/login",data)
    return response.data
}

export const userGet = async() =>{
    let response = await axiosinstance.get("/get")
    return response.data
}


export const accesschats = async({userId}) =>{
    let response = await axiosinstance.post("/chat/access",{userId})
    return response.data
}

export const fatchchats = async() =>{
    let response = await axiosinstance.get("/chat")
    return response.data
}


export const Sendmessage = async(data) =>{
    let response = await axiosinstance.post("/chat/message",data)
    return response.data
}

export const getMessage = async(chatId) =>{
    let response = await axiosinstance.get(`/chat/message/${chatId}`)
    return response.data
}