import express from "express";
const app = express();
const PORT = process.env.PORT || 3002;
import db from "./models";
import routes from "./routes/index";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api", routes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
  app.listen(PORT, () => {
    console.log(`Servre running on PORT ${PORT}`);
  });
});
