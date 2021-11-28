export const GraphqlLoadingCounter = (function() {
  let loadingCount = -1;

  function getCount() {
    return loadingCount;
  }

  function incrementCount() {
    if (loadingCount === -1) {
      loadingCount = 0;
    }
    loadingCount += 1;
  }

  function decrementCount() {
    loadingCount -= 1;
    if (loadingCount < 0) {
      loadingCount = 0;
    }
  }

  return { getCount, incrementCount, decrementCount };
})();
