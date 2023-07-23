const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
//handle uncaugfht exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutdown Due to uncaught error`);
  process.exit(1);
});
//config
dotenv.config({ path: "backend/config/config.env" });
//coonect to db
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});
//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutDown`);
  server.close(() => {
    process.exit(1);
  });
});
