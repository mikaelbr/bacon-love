export default (Bacon, riverFlow, inCriticalMode, isOnBreak, isSingleGate, systemActive, riverFlowLimit) => {
    const isTooMuchWater = riverFlow
        .map(flow => flow > riverFlowLimit)
        .toProperty();

    const isAllowedToNotify = isOnBreak.not()
        .and(
            inCriticalMode.or(systemActive.and(isSingleGate))
        );

    return isTooMuchWater.and(isAllowedToNotify);
};