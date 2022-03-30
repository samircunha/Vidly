require("dotenv").config();

module.exports = function () {
  if(!process.env.JWTPRIVATEKEY){
    throw new Error("FATAL ERROR: JWTPRIVATEKEY is not defined");
  }
};