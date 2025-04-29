// const Fields = require("../models/RequiredFields")
// const User = require("../models/UserData");
// const CardData = require("../models/CardData");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");


// // const filterEmptyValues = (obj) => {
// //     return Object.fromEntries(
// //         Object.entries(obj).filter(([key, value]) => value !== "")
// //     );
// // };

// exports.saveCardData = async (req, res) => {
//     try {
//         const { fieldsId, role, aadharnumber, name, section, contactNumber, address, Class, dateofBirth, admissionNo, bloodGroup, designation, rollNo, emergencyConNo, modeOfTransportation, isApprove = false } = req.body;

//         // console.log("req.body1 : ", req.body);
//         // console.log("req.files : ", req.files)

//         const fieldData = await Fields.findById(fieldsId);
//         if (!fieldData) {
//             return res.status(403).json({
//                 success: false,
//                 message: "fieldData Not Found",
//             })
//         }

//         // console.log("FieldData ", fieldData);

//         let imgUrl = ""
//         if (req.files) {
//             const img = req.files.uploadyourPassport;
//             const Folder = process.env.FOLDER_NAME;
//             const responce = await uploadImageToCloudinary(img, Folder);
//             imgUrl = responce.secure_url
//         }

//         // Create a new CardData document
//         const cardData = new CardData({
//             aadharnumber: aadharnumber || null,
//             name: name.trim(),
//             section: section.trim(),
//             contactNumber: contactNumber || null,
//             address: address.trim(),
//             Class: Class.trim(),
//             dateofBirth: dateofBirth ? dateofBirth: null,
//             uploadyourPassport: imgUrl,
//             admissionNo: admissionNo || null,
//             bloodGroup: bloodGroup ? bloodGroup.trim() : null,
//             designation: designation ? designation.trim() : null,
//             rollNo: rollNo || null,
//             emergencyConNo: emergencyConNo || null,
//             modeOfTransportation: modeOfTransportation ? modeOfTransportation.trim() : null,
//             role: role.trim(),
//             // admin: _id, // Assuming _id is the user ID
//             schoolName: fieldData.schoolName,
//             formField: fieldData._id,
//             template: fieldData.template,
//             isApprove
//         });

//         // Save the document to the database
//         const savedData = await cardData.save();

//         // Update the User document
//         // const updatedAdmin = await User.findByIdAndUpdate(_id, { $push: { CardData: savedData._id } }, { new: true });
//         const updatedFieldsData = await Fields.findByIdAndUpdate(fieldsId, { $push: { user: savedData._id } }, { new: true });

//         return res.status(200).json({
//             success: true,
//             savedData,
//             // updatedAdmin,
//             updatedFieldsData,
//             message: "User Data Saved Successfully",
//         });
//     } catch (error) {
//         // console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//         });
//     }
// };

// // exports.getAllEntryes = async (req, res) => {
// //     // let page = Number(req.query.page) || 1
// //     // let limit = Number(req.query.limit) || 30

// //     const { page = 1, limit = 30 } = req.body;

// //     // console.log("inside getAllEntryes req.body : ", req.body);

// //     try {
// //         // console.log("insid function ")
// //         const data = await CardData.find().skip((page - 1) * limit).limit(limit).populate("formField").exec();
// //         // console.log("data ", data);

// //         if (!data) {
// //         res.status(404).json({
// //                 success: false,
// //                 message: "Data Not Present",
// //             })
// //         }

// //         return res.status(200).json({
// //             success: true,
// //             data,
// //             message: "Data Get Successfully"
// //         })
// //     }
// //     catch (error) {
// //         // console.log("Error : ", error);
// //         return res.status(500).json({
// //             success: false,
// //             message: "Internal Server Error",
// //         })
// //     }
// // }



// // new code 

// // Get All Entries (Fixed)
// exports.getAllEntryes = async (req, res) => {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 3000000000000000;

//     try {
//         const data = await CardData.find()
//             .skip((page - 1) * limit)
//             .limit(limit)
//             .populate("formField")
//             .exec();

//         if (!data || data.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Data Not Present",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data,
//             message: "Data fetched successfully.",
//         });
//     } catch (error) {
//         console.error("Error fetching entries:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//         });
//     }
// };


// exports.getDataBySchoolName = async (req, res) => {
//     const { schoolName, page, limit } = req.body.data;
//     // console.log("req.body in school Name ", req.body.data);
//     try {
//         const data = await CardData.find({ schoolName }).skip((page - 1) * limit).limit(limit).populate("formField").exec();
// // console.log("data", data);
//         if (!data) {
//             return res.status(404).json({
//                 success: false,
//                 message: "School Name not Found"
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             data,
//             message: "Data Fetch Successfully",
//         })
//     }
//     catch (error) {
//         // console.log("Error : ", error)
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         })
//     }
// }

// exports.getAllSchoolNames = async (req, res) => {
//     try {
//         const schools = await Fields.find().select('schoolName');
//         console.log("school names : ", schools.map(school => school.schoolName));

//         if (!schools || schools.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Schools Not Present"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             schools: schools.map(school => school.schoolName),
//             message: "Data Fetched Successfully"
//         });
//     } catch (error) {
//         console.log("Error : ", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });
//     }
// }


// exports.getAllEntryes1 = async (req, res) => {
//     try {
//         // console.log("insid function ")
//         const data = await CardData.find().populate("formField").exec();

//         // console.log("data ", data);

//         if (!data) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Data Not Present",
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             data,
//             message: "Data Get Successfully"
//         })
//     }
//     catch (error) {
//         // console.log("Error : ", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//         })
//     }
// }

// exports.ApproveCard = async (req, res) => {
//     try {
//         const { _id, isApprove, isRejecte } = req.body
//         const user = await CardData.findById(_id);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User Not Found",
//             })
//         }

//         if (isApprove) {
//             user.isApprove = isApprove

//             const newData = await user.save();

//             return res.status(200).json({
//                 success: true,
//                 newData,
//                 message: "User Approved successfully",
//             })
//         }
//         else if (isRejecte) {
//             // const deletedUser = await CardData.findByIdAndDelete(_id);
//             // console.log("isRejecte ")
//             return res.status(200).json({
//                 success: true,
//                 // deletedUser,
//                 message: "Data removed Successfully",
//             })
//         }

//     }
//     catch (error) {
//         // console.log("Error : ", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         })
//     }
// }



// exports.deleteCard = async (req, res) => {
//     try {
//         const { cardId } = req.params;

//         // Find and delete the card
//         const deletedCard = await CardData.findByIdAndDelete(cardId);

//         if (!deletedCard) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Card not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Card deleted successfully",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//         });
//     }
// };







const Fields = require("../models/RequiredFields")
const User = require("../models/UserData");
const CardData = require("../models/CardData");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// const filterEmptyValues = (obj) => {
//     return Object.fromEntries(
//         Object.entries(obj).filter(([key, value]) => value !== "")
//     );
// };

exports.saveCardData = async (req, res) => {
    try {
        const { fieldsId, role, aadharnumber, name, section, contactNumber, address, Class, dateofBirth, admissionNo, bloodGroup, designation, rollNo, emergencyConNo, modeOfTransportation, isApprove = false } = req.body;

        // console.log("req.body1 : ", req.body);
        // console.log("req.files : ", req.files)

        const fieldData = await Fields.findById(fieldsId);
        if (!fieldData) {
            return res.status(403).json({
                success: false,
                message: "fieldData Not Found",
            })
        }

        // console.log("FieldData ", fieldData);

        let imgUrl = ""
        if (req.files) {
            const img = req.files.uploadyourPassport;
            const Folder = process.env.FOLDER_NAME;
            const responce = await uploadImageToCloudinary(img, Folder);
            imgUrl = responce.secure_url
        }

        // Create a new CardData document
        const cardData = new CardData({
            aadharnumber: aadharnumber || null,
            name: name.trim(),
            section: section.trim(),
            contactNumber: contactNumber || null,
            address: address.trim(),
            Class: Class.trim(),
            dateofBirth: dateofBirth ? dateofBirth: null,
            uploadyourPassport: imgUrl,
            admissionNo: admissionNo || null,
            bloodGroup: bloodGroup ? bloodGroup.trim() : null,
            designation: designation ? designation.trim() : null,
            rollNo: rollNo || null,
            emergencyConNo: emergencyConNo || null,
            modeOfTransportation: modeOfTransportation ? modeOfTransportation.trim() : null,
            role: role.trim(),
            // admin: _id, // Assuming _id is the user ID
            schoolName: fieldData.schoolName,
            formField: fieldData._id,
            template: fieldData.template,
            isApprove
        });

        // Save the document to the database
        const savedData = await cardData.save();

        // Update the User document
        // const updatedAdmin = await User.findByIdAndUpdate(_id, { $push: { CardData: savedData._id } }, { new: true });
        const updatedFieldsData = await Fields.findByIdAndUpdate(fieldsId, { $push: { user: savedData._id } }, { new: true });

        return res.status(200).json({
            success: true,
            savedData,
            // updatedAdmin,
            updatedFieldsData,
            message: "User Data Saved Successfully",
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

exports.getAllEntryes = async (req, res) => {
    // let page = Number(req.query.page) || 1
    // let limit = Number(req.query.limit) || 30

    // const { page = 1, limit = 30 } = req.body;

    // console.log("inside getAllEntryes req.body : ", req.body);

    try {
        // console.log("insid function ")
        const data = await CardData.find().populate("formField").exec();
        // console.log("data ", data);

        if (!data) {
        res.status(404).json({
                success: false,
                message: "Data Not Present",
            })
        }

        return res.status(200).json({
            success: true,
            data,
            message: "Data Get Successfully"
        })
    }
    catch (error) {
        // console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

exports.getDataBySchoolName = async (req, res) => {
    const { schoolName, page, limit } = req.body.data;
    // console.log("req.body in school Name ", req.body.data);
    try {
        const data = await CardData.find({ schoolName }).skip((page - 1) * limit).limit(limit).populate("formField").exec();
// console.log("data", data);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "School Name not Found"
            })
        }

        return res.status(200).json({
            success: true,
            data,
            message: "Data Fetch Successfully",
        })
    }
    catch (error) {
        // console.log("Error : ", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.getAllSchoolNames = async (req, res) => {
    try {
        const schools = await Fields.find().select('schoolName');
        console.log("school names : ", schools.map(school => school.schoolName));

        if (!schools || schools.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Schools Not Present"
            });
        }

        return res.status(200).json({
            success: true,
            schools: schools.map(school => school.schoolName),
            message: "Data Fetched Successfully"
        });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


exports.getAllEntryes1 = async (req, res) => {
    try {
        // console.log("insid function ")
        const data = await CardData.find().populate("formField").exec();

        // console.log("data ", data);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data Not Present",
            })
        }

        return res.status(200).json({
            success: true,
            data,
            message: "Data Get Successfully"
        })
    }
    catch (error) {
        // console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

exports.ApproveCard = async (req, res) => {
    try {
        const { _id, isApprove, isRejecte } = req.body
        const user = await CardData.findById(_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }

        if (isApprove) {
            user.isApprove = isApprove

            const newData = await user.save();

            return res.status(200).json({
                success: true,
                newData,
                message: "User Approved successfully",
            })
        }
        else if (isRejecte) {
            // const deletedUser = await CardData.findByIdAndDelete(_id);
            // console.log("isRejecte ")
            return res.status(200).json({
                success: true,
                // deletedUser,
                message: "Data removed Successfully",
            })
        }

    }
    catch (error) {
        // console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



exports.deleteCard = async (req, res) => {
    try {
        const { cardId } = req.params;

        // Find and delete the card
        const deletedCard = await CardData.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Card deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
