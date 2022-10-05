const splitIntoChunks = (
  arr: Uint8Array,
  chunkLength: number = 1024,
  batchSize: number = 16
) => {
  const chunks: Uint8Array[] = [];

  for (let i = 0; i < arr.length; i += chunkLength) {
    chunks.push(arr.slice(i, i + chunkLength));
  }

  const batches: Uint8Array[][] = [];

  for (let i = 0; i < chunks.length; i += batchSize) {
    batches.push(chunks.slice(i, i + batchSize));
  }

  return batches;
};

export default splitIntoChunks;
