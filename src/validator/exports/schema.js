const Joi = require("joi");

const ExportPlaylistsSongsPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportPlaylistsSongsPayloadSchema;
