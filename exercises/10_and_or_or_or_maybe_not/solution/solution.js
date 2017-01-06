module.exports = (Bacon, riverFlow, inCriticalMode, isOnBreak, isSingleGate, systemActive, riverFlowLimit) => {
  const limitExceeded = riverFlow.map(flow => flow > riverFlowLimit);
  const notOnBreak = isOnBreak.not();

  const shouldReport = systemActive
    .and(notOnBreak)
    .and(isSingleGate)
    .or(inCriticalMode);

  return shouldReport.and(limitExceeded);
};
