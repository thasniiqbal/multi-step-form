import { createSlice } from "@reduxjs/toolkit";

export const setPersonalInformation =
  (inputs) => async (dispatch, getState) => {
    const { userForm } = getState();
    console.log("stateBefore", userForm);
    dispatch(setLoading(true));
    fetch("https://5fbe57935923c90016e6ae7f.mockapi.io/api/auth/user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(setRetry(true));
          dispatch(showErr({ flag: true, message: "Not Success" }));
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setLoading(false));
        if (data) {
          dispatch(setRetry(false));
          dispatch(setId(data.id));
          dispatch(setPersonalInfo(inputs));
          dispatch(setPage(userForm.activePage + 1));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

export const updateInfo =
  (inputs, activePage) => async (dispatch, getState) => {
    const { userForm } = getState();
    console.log("activePage", activePage, inputs);
    dispatch(setLoading(true));
    fetch(
      `https://5fbe57935923c90016e6ae7f.mockapi.io/api/auth/user-info/${userForm.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      }
    )
      .then((response) => {
        if (!response.ok) {
          dispatch(setRetry(true));
          dispatch(showErr({ flag: true, message: "Not Success" }));
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(setLoading(false));
        if (data) {
          dispatch(setRetry(false));
          if (userForm.activePage < 2) {
            dispatch(setPage(userForm.activePage + 1));
          }
          if (activePage === 0) {
            dispatch(setPersonalInfo(inputs));
          } else if (activePage === 1) {
            dispatch(setOfficeDetails(inputs));
          } else {
            dispatch(setImages(inputs));
            dispatch(setSuccess(true));
          }
        }
      })
      .catch((error) => {
        throw error;
      });
  };

const initialState = {
  isLoading: false,
  activePage: 0,
  success: false,
  canRetry: false,
  personalInfo: {
    name: "",
    mob: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
  },
  officeDetails: {
    buildingName: "",
    city: "",
    landlineNumber: "",
    officeaddress1: "",
    officeaddress2: "",
    POBoxNumber: "",
  },
  images: {
    profilePicture: "",
    signature: "",
  },
};

const userFormlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPage: (state, action) => {
      state.activePage = action.payload;
    },
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setOfficeDetails: (state, action) => {
      state.officeDetails = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setId: (state, action) => {
      state.userId = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    showErr: (state, action) => {
      state.isError = action.payload.flag;
      state.errMessage = action.payload.message;
    },
    setRetry: (state, action) => {
      state.canRetry = action.payload;
    },
    resetRedux: () => initialState,
  },
});
export const {
  setPage,
  setPersonalInfo,
  setOfficeDetails,
  setImages,
  setLoading,
  setId,
  showErr,
  setSuccess,
  resetRedux,
  setRetry,
} = userFormlice.actions;

export default userFormlice.reducer;
