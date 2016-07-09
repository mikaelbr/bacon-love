module.exports = (Bacon, nidelva, leirelva, buttonClicked) =>
    nidelva
        .combine(leirelva, (leirelvaSample, nidelvaSample) => leirelvaSample + nidelvaSample)
        .sampledBy(buttonClicked);