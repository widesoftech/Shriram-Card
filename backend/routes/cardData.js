const express = require("express");
const router = express.Router();

const { saveCardData, getAllEntryes, ApproveCard, getDataBySchoolName, getAllSchoolNames ,deleteCard} = require("../controlers/CardData");
const { auth } = require("../controlers/User");
 

router.post("/setCardData", saveCardData);
router.get("/getAllEntryes",  getAllEntryes);
router.post("/getDataBySchoolName",  getDataBySchoolName);
router.put("/approveCard",  ApproveCard);
router.get("/getAllSchoolNames",  getAllSchoolNames);
router.delete("/delete/:cardId", deleteCard);


module.exports = router