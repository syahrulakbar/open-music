const { AlbumPayloadSchema, CoverAlbumHeadersSchema } = require("./schema");
const InvariantError = require("../../exceptions/InvariantError");

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateCoverAlbumHeaders: (headers) => {
    const validationResult = CoverAlbumHeadersSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
