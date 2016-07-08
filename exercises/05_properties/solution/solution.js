// Export method taking in the correct arguments.
export default Bacon => Bacon.sequentially(10, [11, 12, 13]).toProperty(10);