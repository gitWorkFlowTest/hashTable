/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
var getIndexBelowMaxForKey = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

var makeHashTable = function() {
  var result = {};
  var storage = [];
  var storageLimit = 1000;
  result.insert = function(key, value) {
    // TODO: implement `insert()`
    var hash = getIndexBelowMaxForKey(key);
    if (storage[hash]) {
      for (var i = 0; i < storage[hash].length; i++) {
        if (storage[hash][i]) {
          if (storage[hash][i][0] === key) {
            storage[hash][i] = [key, value];
            return;
          }
        }
      }
      storage[hash].push([key, value]);
    } else {
      var bucket = [];
      bucket.push([key, value]);
      storage[hash] = bucket;
    }
  };

  result.retrieve = function(key) {
    var hashedKey = getIndexBelowMaxForKey(key, storageLimit);

    var bucket = storage[hashedKey] || [];

    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }

    return null;
  };

  result.remove = function(/*...*/ 
) {
    // TODO: implement `remove()`
  };

  return result;
};
