function memoize(func) {
  var memoized = function() {
    var args = arguments,
        key = args[0] || 'cache',
        cache = memoized.cache;

    if (Object.keys(cache).indexOf(key.toString()) > -1) {
      return cache[key];
    }
    
    var result = func.apply(this, args);
    memoized.cache[key] = result || cache;
    return result;
  };
  memoized.cache = new Object();
  return memoized;
}

// test code

var userId = 1
function getUserId() {
  userId ++
  return userId
};

var meGetuserId = memoize(getUserId)

console.log(meGetuserId()) // 2
console.log(meGetuserId()) // 2
console.log(meGetuserId()) // 2