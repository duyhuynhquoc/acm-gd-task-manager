const taskRouter = require("./task");

const indexRouter = (app) => {
	app.use("/api/", taskRouter);
};

module.exports = indexRouter;
