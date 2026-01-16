import axiosinstance from "../axioinstance"

export const createUser = async(data) =>{
    let response = await axiosinstance.post("/create",data)
    return response.data
}


export const loginuser =  async(data) =>{
    let response = await axiosinstance.post("/login",data)
    return response.data
}


export const accesschats = async(data) =>{
    let response = await axiosinstance.post("/chat",data)
    return response.data
}

export const fatchchats = async(data) =>{
    let response = await axiosinstance.post("/chat",data)
    return response.data
}