const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const indexRouter = require("./routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"https://agitated-shirley-416ca2.netlify.app"
	);

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

indexRouter(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
