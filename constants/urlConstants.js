"use strict";

module.exports = {
  //User URL constants (customers)
  customerSignup: "/users/customer/signup",
  customerSignin: "/users/customer/signin",
  customerEdit: "/users/customer/edit/:customerId",
  customerDelete: "/users/customer/delete/:customerId",
  customerList: "/users/customer/list",
  selectCustomer: "/users/customer/:customerId",

  //User URL constatns (owner)
  ownerSignup: "/users/owner/signup",
  ownerSignin: "/users/owner/signin",
  ownerEdit: "/users/owner/edit/:ownerId",
  ownerDelete: "/users/owner/delete/:ownerId",
  ownerList: "/users/owner/list",
  selectOwner: "/users/owner/:ownerId",

  //Room URL constants
  addRoom: "/rooms/add",
  editRoom: "/rooms/edit/:roomId",
  deleteRoom: "/rooms/delete/:roomId",
  updateRoomStatus: "/rooms/updateStatus",
  selectRoom: "/rooms/:roomId",
  uploadImages: "/rooms/uploadImage/:roomId",
  deleteImages: "/rooms/deleteImage/:roomId",
};
