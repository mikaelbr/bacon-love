export default (Bacon, riverFlowInCubicFeet, litresInCubicFeet) =>
    riverFlowInCubicFeet
        .flatMap(([cubicFeet, numberOfSamples]) => {
            const litres = Math.round(cubicFeet * litresInCubicFeet);

            if (litres > 200000) {
                return Bacon.interval(100, litres).take(numberOfSamples);
            } else {
                return Bacon.never();
            }
        });