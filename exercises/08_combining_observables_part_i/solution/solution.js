module.exports = function (Bacon, messages, keys, decoderFunction) {
  return messages
    .zip(keys)
    .map(decoderFunction);
};