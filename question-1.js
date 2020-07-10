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
