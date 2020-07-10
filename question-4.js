/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
  var numStr = num.toString();

  for (var i = 0; i < numStr.length; i++) {
    var nbr = numStr[i];
    var index = i;

    for (var x = numStr.length - 1; x > i; x--) {
      if (numStr[x] > nbr) {
        nbr = numStr[x];
        index = x;
        console.log('待交换 nbr', nbr)
      }
    }

    if (nbr != numStr[i]) {
      var arr = numStr.split('');

      var tmp = arr[i];

      arr[i] = arr[index];
      arr[index] = tmp;
      console.log('交换后数', parseInt(arr.join('')))
      return parseInt(arr.join(''));
    }
  }
  return num;
};

// test code
console.log(maximumSwap(5987))