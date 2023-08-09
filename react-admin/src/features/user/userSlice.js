import { createSlice } from "@reduxjs/toolkit";
import {
  changePass,
  createMamuUser,
  createPermission,
  createRoles,
  deletePermission,
  deleteRole,
  getAllPermission,
  getAllRole,
  getMamuUser,
  permissionUpdate,
  roleUpdate,
  statusMamuUserUpdate,
  statusPermissionUpdate,
  statusRoleUpdate,
} from "./userApiSlice";

//create user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    role: null,
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state, payload) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.permission.push(action.payload.permission);
        state.message = action.payload.message;
      })
      .addCase(permissionUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(permissionUpdate.fulfilled, (state, action) => {
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permission = state.permission.filter(
          (data) => data._id !== action.payload.permission._id
        );
        state.message = action.payload.message;
      })
      .addCase(statusPermissionUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(statusPermissionUpdate.fulfilled, (state, action) => {
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
      })
      .addCase(getAllRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = action.payload;
      })
      .addCase(createRoles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRoles.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.role.push(action.payload.roles);
        state.message = action.payload.message;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.role = state.role.filter(
          (data) => data._id !== action.payload.roles._id
        );
        state.message = action.payload.message;
      })
      .addCase(changePass.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changePass.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(statusRoleUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(statusRoleUpdate.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id == action.payload.roles._id)
        ] = action.payload.roles;
      })
      .addCase(roleUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(roleUpdate.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id === action.payload.roles._id)
        ] = action.payload.roles;
      })
      .addCase(getMamuUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getMamuUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(createMamuUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createMamuUser.fulfilled, (state, action) => {
        state.user = state.user ?? [];
        state.user.push(action.payload.user);
        state.message = action.payload.message;
      })
      .addCase(statusMamuUserUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(statusMamuUserUpdate.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex((data) => data._id == action.payload.user._id)
        ] = action.payload.user;
      });
  },
});

//selectors
export const getAllPrmissionData = (state) => state.user;

//actions
export const { setMessageEmpty } = userSlice.actions;

//export
export default userSlice.reducer;
