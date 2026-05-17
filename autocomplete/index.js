function createAutoComplete(data) {
  if (!data || !Array.isArray(data)) {
    return () => [];
  }

  const indexedData = data.map((item, originalIdx) => ({
    item: String(item),
    lower: String(item).toLowerCase(),
    originalIdx
  }));

  const sortedIndices = indexedData.sort((a, b) => {
    if (a.lower < b.lower) return -1;
    if (a.lower > b.lower) return 1;
    return a.originalIdx - b.originalIdx;
  });

  function findLeftBound(prefix) {
    let lo = 0;
    let hi = sortedIndices.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sortedIndices[mid].lower < prefix) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  }

  function findRightBound(nextPrefix) {
    let lo = 0;
    let hi = sortedIndices.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sortedIndices[mid].lower < nextPrefix) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  }

  return function (prefix) {
    if (!prefix || typeof prefix !== 'string') {
      return [];
    }

    const lowerPrefix = prefix.toLowerCase();
    
    const nextPrefix =
      lowerPrefix.slice(0, -1) +
      String.fromCharCode(lowerPrefix.charCodeAt(lowerPrefix.length - 1) + 1);

    const left = findLeftBound(lowerPrefix);
    const right = findRightBound(nextPrefix);

    if (left >= right) {
      return [];
    }

    const matches = sortedIndices.slice(left, right);

    matches.sort((a, b) => a.originalIdx - b.originalIdx);

    return matches.map(entry => entry.item);
  };
}

module.exports = { createAutoComplete };