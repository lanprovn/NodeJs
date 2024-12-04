import "express-async-errors"; //Xử lý lỗi không đồng bộ trong các hàm router mà không cần viết try-catch thủ công.
import * as dotenv from "dotenv";
dotenv.config(); //Tải các biến môi trường từ file .env vào process.env.
import express from "express"; //Framework web phổ biến để xây dựng các ứng dụng API.
const app = express();
import morgan from "morgan"; //Middleware để ghi log các yêu cầu HTTP (hữu ích trong môi trường phát triển).
import mongoose from "mongoose"; //Thư viện ODM để làm việc với MongoDB trong Node.js.
import cookieParser from "cookie-parser";

//routers
import jobRouter from "./server/routes/jobRouter.js";
import authRouter from "./server/routes/authRouter.js";
import userRouter from "./server/routes/userRouter.js";

//middleware
import errorHandlerMiddleware from "./server/middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./server/middleware/authMiddleware.js";
/********************/
//Xác định môi trường hiện tại (ví dụ: development hoặc production).
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

//API

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//Error Middleware
app.use(errorHandlerMiddleware);

//****************** */
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
