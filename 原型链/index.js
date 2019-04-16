function main() {
  /*
   * @Author: saber2pr 
   * @Date: 2019-04-16 09:52:22 
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-16 12:37:36
   */
  // 实例的构造函数
  function Cat() {}
  // 实例
  const cat = new Cat()

  // 实例的原型就是构造函数的prototype
  console.log(cat.__proto__ === Cat.prototype)

  // 实例构造函数的原型就是构造函数的原型
  console.log(Cat.__proto__ === Function.prototype)

  // 构造函数的原型的构造函数就是自己
  console.log(Cat.prototype.constructor === Cat)

  // 构造函数的原型的原型就是Object构造函数的原型
  console.log(Function.prototype.__proto__ === Object.prototype)
  console.log(Array.prototype.__proto__ === Object.prototype)
  console.log(Date.prototype.__proto__ === Object.prototype)
  console.log(Error.prototype.__proto__ === Object.prototype)
  // 这些对象的构造函数就是Object
  console.log(JSON.__proto__ === Object.prototype)
  console.log(Reflect.__proto__ === Object.prototype)

  // 实例的原型的构造函数就是实例的构造函数
  console.log(Cat.prototype.constructor === Cat)

  // 实例原型的原型就是Object构造函数的prototype
  console.log(Cat.prototype.__proto__ === Object.prototype)

  // Object实例的原型的原型是null
  console.log(Object.prototype.__proto__ === null)

  // __proto__链：cat实例 -> Cat原型 -> Object原型 -> null
  console.log(cat.__proto__.__proto__.__proto__ === null)

  // __proto__ 的作用
  /**
   * 当读取实例属性时，先在实例身上找，找不到就去__proto__上找，__proto__就是一条连接实例和实例原型的链条，
   * 当然实例原型也有自己的原型。
   * 顺着__proto__一直向上找会找到Object.prototype，再往上就是null
   */
  // prototype的作用
  /**
   * 获得构造函数的原型，用于给原型添加方法和属性
   */
  // constructor的作用
  /**
   * 在prototype上有一个constructor属性，指向构造函数。
   * 即 constructor.prototype.constructor === constructor
   * 如果prototype被改变，则constructor指向也改变
   */
}