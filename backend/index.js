const express = require("express");
const app = express();
const cors = require("cors")
const database = require("./config/DBconnection")
const userRoutes = require("./routes/user");
const fieldsRoutes = require("./routes/fields")
const dataRoutes = require("./routes/cardData");
const templateRoutes = require("./routes/templateRoutes");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT ;

database.connect();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

// app.use(
//     cors({
//         // origin: "http://localhost:5173",
//   origin: ['https://shriramcard.com', 'https://www.shriramcard.com']
//         // origin: "https://shriram-card.onrender.com",
//         methods: ["GET", "POST", "DELETE", "PUT"],
//         allowedHeaders: [
//           "Content-Type",
//           "Authorization",
//           "Cache-Control",
//           "Expires",
//           "Pragma",
//         ],
//         credentials: true,

//     })
// );

app.use(
  cors({
    origin: ['https://shriramcard.com', 'https://www.shriramcard.com','*'],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

cloudinaryConnect();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/fields", fieldsRoutes);
app.use("/api/v1/data", dataRoutes);
app.use("/api/v1/template", templateRoutes);

// app.get("/", (req, res) => {
// 	return res.json({
// 		success: true,
// 		message: "Your server is up and running ...",
// 	});
// });


app.use(express.static(path.join(path.resolve(), "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client", "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
