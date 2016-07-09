module.exports = (Bacon, messages, keys, decoderFunction) =>
    messages
        .zip(keys)
        .map(decoderFunction);