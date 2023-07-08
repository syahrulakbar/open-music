const route = (handler) => [
  {
    method: "POST",
    path: "/export/playlists/{playlistId}",
    handler: (request, h) => handler.postExportPlaylistsSongsHandler(request, h),
    options: {
      auth: "openmusic_jwt",
    },
  },
];

module.exports = route;
