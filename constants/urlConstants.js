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
  listRooms: "/rooms/list",
  listRoomsByCity: "/rooms/list/:cityName",
  uploadImages: "/rooms/uploadImage/:roomId",
  deleteImages: "/rooms/deleteImage/:roomId",
  availablityCalender: "/rooms/availableDates/:roomId",

  //Room booking URL constants
  bookRoom: "/rooms/:roomId/book",
  listRoomStatusByOwner: "/rooms/roomStatus/owner/:ownerId",
  listRoomStatusByCustomer: "/rooms/roomStatus/customer/:customerId",
  changeStatus: "/rooms/roomStatus/:statusId",
};
