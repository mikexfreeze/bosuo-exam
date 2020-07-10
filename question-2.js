/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {

  const timeTicks = new Array(1440).fill(0);

  for (let point of timePoints) {
    const [hour, min] = point.split(':');
    const minutes = parseInt(hour) * 60 + parseInt(min);
    if (timeTicks[minutes] === 1) {
      return 0; 
    }
    timeTicks[minutes] += 1
  }

  let first;
  let prev;
  let min = Infinity;

  for (let i = 0; i < timeTicks.length; i++) {
    if (timeTicks[i] === 1) {
      if (first === undefined) {
        first = i;
      }
      if (prev !== undefined) {
        // 比较两组存在的时间之间的差值
        min = Math.min(i - prev, min);
      }
      prev = i;
    }
  }
  // 比较头尾的差值
  return Math.min(min, 1440 - prev + first);

};

var result = findMinDifference(['00:00', '00:01','12:59', '23:58',])
console.log(result)