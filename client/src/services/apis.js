// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = `https://shriram-card.onrender.com/api/v1`
// const BASE_URL = `http://localhost:5000/api/v1`
// const BASE_URL = `https://shriramcard.com/api/v1`
const BASE_URL = 'https://www.shriramcard.com/api/v1';


// http://localhost:4000/api/v1/user/login
export const userEndpoints = {
  USER_SIGNUP_API: BASE_URL + "/user/signup",
  USER_LOGIN_API: BASE_URL + "/user/login",
  UPDATE_USER_DATA_API: BASE_URL + "/user/updateUserDetails",
  SHOW_USER_DETAILS_API: BASE_URL + "/user/getUserDetails",
}

export const fildsEndpoints = {
  CREAT_FIELDS_API: BASE_URL + "/fields/createFields",
  SAVE_USER_DATA_API: BASE_URL + "/data/setCardData",
  GET_FORMS_FIELDS_API: BASE_URL + "/fields/getFormFields",
  SET_TEMP_IMAGES_API: BASE_URL + "/fields/setTemplates",
  GET_ALL_DATA_API: BASE_URL + "/data/getAllEntryes",
  APPROVE_CARD_API: BASE_URL + "/data/approveCard",
  GET_OVERLAY_BY_SCHOOL_NAME_API: BASE_URL + "/fields/getOverlayBySchool",
}
