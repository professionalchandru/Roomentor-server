"use strict";

module.exports = {
  //Common Messages
  defaultMessage: "Something Went Wrong",
  noAccess: "You don't have access to use this option",
  dbConnectionError: "Data Base Connection Error",
  dbConnectionSuccess: "Data Base Connected Successfully",
  appListening: "Server listening on port",
  failure: "Failure",
  success: "Success",
  invalidPassword: "Invalid Password",
  passwordMissMatch: "Password And Confirm Password Are Not Matched",

  // Customer Related Messages
  customerAdded: "New Customer Added Successfully",
  customerAlreadyExist: "Customer Email or Mobile Number Already Exists",
  customerUpdatedSuccessfully: "Customer Updated Successfully",
  customerDeletedSuccessfully: "Owner Deleted Successfully",
  customerNotFound: "Customer Email Not Found",
  invalidCustomer: "Invalid Customer",
  cannotDeleteCustomer:
    "Can't Delete Your Account. You Booked Rooms Already. Please Wait Until Vacate The Rooms",

  // Owner Related Messages
  ownerAdded: "New Owner Added Successfully",
  ownerAlreadyExist: "Owner Email or Mobile Number Already Exists",
  ownerUpdatedSuccessfully: "Owner Updated Successfully",
  ownerDeletedSuccessfully: "Owner Deleted Successfully",
  ownerNotFound: "Owner Email Not Found",
  invalidOwner: "Invalid Owner",
  cannotDeleteOwner:
    "Can't Delete Room. Customer Booked Already. Wait Until Customer Vacate The Rooms",

  // JWT Token Related Messages
  unAuthourized: "Un Authourized User",
  tokenVerificationFailed: "Token Verification Failed",

  // Room Related Messages
  invalidRoom: "Invalid Room",
  noRoomsFound: "No Rooms Found",
  roomUpdatedSuccessfully: "Room Updated Successfully",
  roomDeletedSuccessfully: "Room Deleted Successfully",
  minumumStayPeriod:
    "Can't Book Same Day For Enter and Vacate a Room. Minimum Stay is One Day",
  stayPeriodIncorrect:
    "Please Choose No Of Days According To The Minumum and Maximum Stay Period",
  cannotChoosePreviousDates:
    "Can't Choose End Date Previous Dates OF Start Dates",
  inValidDates: "Invalid Dates. Please Choose Correct Dates",
  roomStatusNotFound: "Booked Status Not Found",
  roomStatusUpdatedSuccessFully: "Room Status Updated Successfully",
  cannotDeleteRooms: "Can't Delete Room. Customer Booked Already.",

  // Iamges Related Messages
  unSupportedFileFormat:
    "Unsupported File Format. Please Upload only .jpeg or .jpg format.",
  uploadedSuccessfully: "Images Uploaded Successfully",
  removedSuccessfully: "Image Removed Successfully",
};
