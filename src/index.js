import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import express from "express";
import cors from "cors";
import { matchFixtureResource } from "./resources/games.Resource.js";
import MatchTeamPlayers from "./components/MatchTeamPlayers.jsx";

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();

app.use(cors());
app.use(express.json());

const adminJs = new AdminJS({
  resources: [matchFixtureResource],
  dashboard: {
    component: AdminJS.bundle("./components/dashboard"),
  },
  branding: {
    companyName: "NSFL Admin",
    logo: false,
    softwareBrothers: false,
  },
  assets: {
    styles: ["/custom.css"],
  },
  components: {
    MatchTeamPlayers: AdminJS.bundle("./components/MatchTeamPlayers"),
  },

});

const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `AdminJS started on http://localhost:${PORT}${adminJs.options.rootPath}`
  );
});
