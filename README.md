## 伯索科技笔试题
### 题目一
解释：
```
var a = { name: "hello" }, b = { name: "hi" }
function exchange(a, b) {
  var c = b; b = a; a = c;
  a.name = a.name + "1";
  b.name = b.name + "2";
  console.info(a.name, b.name);
}
exchange(a, b);
console.info(a.name, b.name);
```
答：
```
var a = {
  name: "hello"
}, b = { name: "hi" }

function exchange(a1, b1) {
  /**
   * 传参进函数内部，JS 会创建参数的副本，这里用 a1, b1 指代副本，
   * 但若参数是对象，拷贝的只是指针。
   */
  
  var c = b1; 
  b1 = a1; // b1 等于 a
  a1 = c; // a1 等于 b
  a1.name = a1.name + "1"; // b.name 等于 hi1
  b1.name = b1.name + "2"; // a.name 等于 hello2

  /**
   * a1.name 被赋值的同时， b.name 也被赋值，因为此时 a1 和 b 指向的是同一个对象。
   * 下面执行 console.log(a1 === b) 可以确定
   */
  console.log(a1 === b)
  
  // a1.name 等于 b.name 等于 hi1
  // b1.name 等于 a.name 等于 hello2 
  console.info(a1.name, b1.name);
}

exchange(a, b);

console.info(a.name, b.name);
```

### 题目二

时间比较题:输入一组时间字符串，求出这组时间中的间隔最小的时间差（分），如输入 “23:59","00:00"，返回1 ; 假设输入数组的长度大于2且小于2000; (本题可以写伪代码)
```
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

var result = findMinDifference(['00:00', '00:01', '12:59', '23:58',])
console.log(result) // 1
```

### 题目三

假如有一个接口getUersById(userId),返回用户信息的json; 要求getUersById能缓存用户信息，即同样的userId请求仅向服务器发送一次,其余从内存中获取,以提高效率。 高阶要求: 假设有getUersById，getShoolInfoById, getDeviceInfoById … 都需要缓存结果，提供一个通用的 辅助 函数。
```
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
```

### 题目四

4. 输入一个数字, 交换两位数字, 最多交换一次, 输出可以得到的最大的数字; 如输入: 1234 交换 1,4后, 得到4231;

```
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
console.log(maximumSwap(5987)) // 9587
```
