import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  dashboard: componentLoader.add("DashboardUI", "./DashboardUI.jsx"),

};

export { componentLoader, Components };
