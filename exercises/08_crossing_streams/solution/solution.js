module.exports = function (messages, keys, decoderFunction) {
  return messages
    .zip(keys)
    .map(decoderFunction);
};