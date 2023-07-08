const path = require("path");

const routes = (handler) => [
  {
    method: "POST",
    path: "/albums",
    handler: (request, h) => handler.postAlbumHandler(request, h),
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: (request, h) => handler.getAlbumByIdHandler(request, h),
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: (request, h) => handler.putAlbumByIdHandler(request, h),
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: (request, h) => handler.deleteAlbumByIdHandler(request, h),
  },
  {
    method: "POST",
    path: "/albums/{id}/covers",
    handler: (request, h) => handler.postCoverAlbumByIdHandler(request, h),
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        output: "stream",
        maxBytes: 500000,
      },
    },
  },
  {
    method: "GET",
    path: "/albums/{params*}",
    handler: {
      directory: {
        path: path.resolve(__dirname, "file"),
      },
    },
  },
];

module.exports = routes;
