module.exports = function (Bacon, nidelva, leirelva, buttonClicked) {
  var nidelvaWhenButtonClicked = nidelva.sampledBy(buttonClicked);

  return leirelva.sampledBy(nidelvaWhenButtonClicked, function (leirelvaSample, nidelvaSample) {
    return leirelvaSample + nidelvaSample;
  });
};