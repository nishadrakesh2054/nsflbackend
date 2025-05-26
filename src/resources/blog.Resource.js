import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import AdminJS from "adminjs";
import { componentLoader } from "../components/componentsLoader.js";
import Blog from "../models/blog.Model.js";
import Sponser from "../models/sponser.Model.js";
import Highlight from "../models/highlight.Model.js";

AdminJS.registerAdapter(AdminJSSequelize);

const localProvider = {
  bucket: "public/uploads",
  opts: {
    baseUrl: "/uploads",
    delete: false,
  },
};

export const sponserResource = {
  resource: Sponser,
  options: {
    navigation: { label: "Sponsors", icon: "Star" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    showProperties: ["id", "name", "logo", "file", "website", "createdAt"],
    listProperties: ["id", "name", "file", "website"],
    properties: {
      id: {
        isVisible: { list: true, filter: true, show: true, edit: false },
        position: 1,
      },
      name: {
        position: 2,

        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      logo: {
        position: 3,
        type: "file",
        // isVisible: { list: true, edit: true, filter: false, show: true },
        isVisible: { list: true, edit: false, filter: true, show: true },
      },
      website: {
        position: 4,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      imageKey: {
        isVisible: false,
      },
      bucket: {
        isVisible: false,
      },
      mime: {
        isVisible: false,
      },
      createdAt: {
        position: 5,
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: false,
      },
    },
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      componentLoader,
      properties: {
        filePath: "logo",
        key: "imageKey",
        bucket: "bucket",
        mimeType: "mime",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      },

      uploadPath: (record, filename) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = filename.split(".").pop();
        return `sponsers/${filename.split(".")[0]}-${uniqueSuffix}.${ext}`;
      },
    }),
  ],
};

export const blogResource = {
  resource: Blog,
  options: {
    navigation: { label: "News", icon: "FileText" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    listProperties: [
      "id",
      "title",
      "preview",
      "readTime",
      "category",
      "file",
      "views",
      "date",
    ],
    showProperties: [
      "id",
      "title",
      "content",
      "preview",
      "readTime",
      "tags",
      "image",
      "file",
      "category",
      "views",
      "date",
      "createdAt",
    ],
    properties: {
      id: {
        position: 1,
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      title: {
        position: 2,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      preview: {
        position: 3,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },

      content: {
        position: 4,
        type: "richtext",
        custom: {
          quill: {
            modules: {
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ["clean"],
              ],
            },
            theme: "snow",
            placeholder: "Type your content here...",
            bounds: ".admin-bro_Edit",
          },
        },
        isVisible: { list: false, filter: false, show: true, edit: true },
      },

      readTime: {
        position: 5,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      tags: {
        position: 6,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      image: {
        position: 7,
        type: "file",
        isVisible: { list: true, edit: false, filter: true, show: true },
      },
      category: {
        position: 8,
        availableValues: [
          { value: "Match Reports", label: "Match Reports" },
          { value: "League News", label: "League News" },
          { value: "Team News", label: "Team News" },
          { value: "Interviews", label: "Interviews" },
        ],
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      views: {
        position: 9,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      date: {
        position: 10,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      imageKey: {
        isVisible: false,
      },
      bucket: {
        isVisible: false,
      },
      mime: {
        isVisible: false,
      },
      createdAt: {
        position: 11,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      updatedAt: {
        isVisible: false,
      },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        filePath: "image",
        key: "imageKey",
        bucket: "bucket",
        mimeType: "mime",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      },
      uploadPath: (record, filename) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = filename.split(".").pop();
        return `news/${filename.split(".")[0]}-${uniqueSuffix}.${ext}`;
      },
    }),
  ],
};

export const highlightResource = {
  resource: Highlight,
  options: {
    navigation: { label: "Highlights", icon: "PlayCircle" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      refreshYouTubeData: {
        actionType: "record",
        icon: "Refresh",
        handler: async (request, response, context) => {
          const { record } = context;
          await record.refreshYouTubeData();
          return {
            record: record.toJSON(),
            notice: {
              message: "YouTube data refreshed successfully",
              type: "success",
            },
          };
        },
      },
    },
    listProperties: [
      "id",
      "title",
      "file",
      "publishedDate",
      "views",
      "duration",
    ],
    showProperties: [
      "id",
      "title",
      "description",
      "image",
      "file",
      "videoUrl",
      "duration",
      "publishedDate",
      "views",
      "createdAt",
    ],
    properties: {
      id: {
        position: 1,
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      title: {
        position: 2,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      description: {
        position: 3,
        type: "textarea",
        isVisible: { list: false, show: true, edit: true },
      },
      image: {
        position: 4,
        type: "file",
        isVisible: { list: true, edit: false, filter: true, show: true },
      },
      videoUrl: {
        position: 5,
        isVisible: { list: false, show: true, edit: true },
      },
      duration: {
        position: 6,
        isVisible: { list: true, show: true, edit: true },
      },
      publishedDate: {
        position: 7,
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      views: {
        position: 8,
        isVisible: { list: true, show: true, edit: false },
      },
      imageKey: {
        isVisible: false,
      },
      bucket: {
        isVisible: false,
      },
      mime: {
        isVisible: false,
      },
      createdAt: {
        position: 9,
        isVisible: { list: false, show: true, edit: false },
      },
      updatedAt: {
        isVisible: false,
      },
      videoId: { isVisible: false },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        filePath: "image",
        key: "imageKey",
        bucket: "bucket",
        mimeType: "mime",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      },
      uploadPath: (record, filename) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = filename.split(".").pop();
        return `highlights/${filename.split(".")[0]}-${uniqueSuffix}.${ext}`;
      },
    }),
  ],
};
