class AlbumsHandler {
  constructor(service, validator, songsService, storageService) {
    this._service = service;
    this._validator = validator;

    this._songsService = songsService;
    this._storageService = storageService;
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: "success",
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);

    const songs = await this._songsService.getSongsByAlbumId(id);

    const response = h.response({
      status: "success",
      data: {
        album: { ...album, songs },
      },
    });

    response.code(200);
    return response;
  }

  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { id } = request.params;
    const { name, year } = request.payload;

    await this._service.editAlbumById(id, { name, year });

    const response = h.response({
      status: "success",
      message: "Success update album",
    });

    response.code(200);
    return response;
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteAlbumById(id);

    const response = h.response({
      status: "success",
      message: "Success delete album",
    });

    response.code(200);
    return response;
  }

  async postCoverAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const { cover } = request.payload;

    await this._validator.validateCoverAlbumHeaders(cover.hapi.headers);
    const filename = await this._storageService.writeFile(cover, cover.hapi);

    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/albums/images/${filename}`;

    await this._service.editCoverAlbumById(id, coverUrl);

    const response = h.response({
      status: "success",
      message: "Sampul berhasil diunggah",
    });
    response.code(201);
    return response;
  }
}
module.exports = AlbumsHandler;
