const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/db");

const indexRouter = require("./routers");

db.connect(function (err) {
	if (err) throw err;
	console.log("Database connected!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

indexRouter(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
