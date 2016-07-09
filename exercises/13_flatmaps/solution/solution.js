module.exports = (Bacon, riverFlowInCubicFeet, litresInCubicFeet) =>
    riverFlowInCubicFeet
        .flatMap(tuple => {
            const cubicFeet = tuple[0];
            const numberOfSamples = tuple[1];
            
            const litres = Math.round(cubicFeet * litresInCubicFeet);

            if (litres > 200000) {
                return Bacon.interval(100, litres).take(numberOfSamples);
            } else {
                return Bacon.never();
            }
        });