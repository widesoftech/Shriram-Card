import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { fildsEndpoints } from "../apis";

const { CREAT_FIELDS_API,
    SAVE_USER_DATA_API,
    GET_FORMS_FIELDS_API,
    GET_ALL_DATA_API,
    SET_TEMP_IMAGES_API,
    GET_OVERLAY_BY_SCHOOL_NAME_API,
    APPROVE_CARD_API
} = fildsEndpoints;


export const createFields = async (data) => {
    const toastId = toast.loading("Loading...");
    let result = {};
    try {
        console.log("data in filds Api : ", data);
        const res = await apiConnector("POST", CREAT_FIELDS_API, data);
        console.log("res of fiels ", res.data.fields);
        result = res.data?.fields
    }
    catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
    return result;
}

export const getFormFiels = async (data) => {
    const toastId = toast.loading("Loading...");
    let result = null
    try {
        console.log("data in getFormFiels : ", data);
        const res = await apiConnector("POST", GET_FORMS_FIELDS_API, data);
        console.log("res ", res.data);
        result = res.data;
    }
    catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
    return result
}

export const saveFormData = async (data, navigate) => {
    const toastId = toast.loading("Loading...");
    let response = null;
    try {
        console.log("data in saveFormData fun : ", data);
        const res = await apiConnector("POST", SAVE_USER_DATA_API, data, {
            "Content-Type": "multipart/form-data",
        });
        response = res;
        console.log("res of SAVE_USER_DATA_API : ", res);
        toast.success("Data saved Successfully");
        navigate("/success");
    }
    catch (error) {
        console.log("Error : ", error)
        console.log("SAVE_USER_DATA_API Error")
        toast.error(error.response?.data?.message)
    }
    toast.dismiss(toastId);
    return response;
}

export const getAllData = async (Token) => {
    const toastId = toast.loading("Loading...");
    let response = {};
    try {
        console.log("Insid function : ")
        const data = await apiConnector("GET", GET_ALL_DATA_API, {}, {
            Authorization: `Bearer ${Token}`,
           
        })
        console.log("Data in GET_ALL_DATA_API : ", data);
        response = data;
    }
    catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
    }
    toast.dismiss(toastId);
    return response;
}

export const setTemplates = async (data) => {
    const toastId = toast.loading("Loading...");
    let response = null
    try {
        console.log("Inside Function ");
        const res = await apiConnector("POST", SET_TEMP_IMAGES_API, data,
            {
                "Content-Type": "multipart/form-data",
            })

        console.log(res);
        response = res.data.updatedFields
        
    }
    catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
    return response;
}

export const getOverlayBySchool = async (schoolName) => {
    let responce = null;
    try{
        console.log("School name in func : ", schoolName);
        const res = apiConnector("POST", GET_OVERLAY_BY_SCHOOL_NAME_API, {schoolName} );
        console.log("res of overly ", res.data.field);
        responce = res;
    }
    catch(error) {
        console.log("Error : ", error);
        toast.error(error.data.response.message);
    }
    return responce;
}

export const ApproveCard = async (data) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        console.log("data in aproveal Api : ", data);
        const res = await apiConnector("PUT", APPROVE_CARD_API, data);
        console.log("Res of Approve : ", res.data);
        result = res.data
        toast.success("Data Aproved Successfully")
    }
    catch(error) {
        console.log("Error : ", error)
        toast.error(error.responce.data.message)
    }
    toast.dismiss(toastId);
    return result
}