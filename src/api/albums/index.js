const routes = require("./routes");
const AlbumsHandler = require("./handler");

module.exports = {
  name: "albums",
  version: "1.0.0",
  register: async (
    server,
    {
      service,
      validator,
      songsService,

      storageService,
    },
  ) => {
    const albumsHandler = new AlbumsHandler(service, validator, songsService, storageService);
    server.route(routes(albumsHandler));
  },
};
