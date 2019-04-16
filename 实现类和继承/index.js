/*
 * @Author: saber2pr 
 * @Date: 2019-04-15 22:17:06 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-16 11:41:03
 */
// 首先定义父类
function Animal(name) {
  // 构造函数中都是实例的属性，不同实例不共享
  this.name = name || 'Animal'
  this.getName = function () {
    return this.name
  }
}

// 原型上的属性，不同实例会共享此属性，不能多继承
Animal.prototype.age = 233

///////////////////////////////////////////////////////////

// 原型链继承，实例上找不到属性会去__proto__原型上找
function Dog(name) {
  this.name = name
}
// 设置原型为Animal实例，这会导致所有实例共享以下属性
Dog.prototype = new Animal('Dog')

///////////////////////////////////////////////////////////

// 构造函数继承
function Cat(name) {
  // 劫持父类的构造方法来初始化子类属性，多继承就多call几个
  Animal.call(this, name)
}
// 只能继承构造属性，不能继承原型属性
// 不能实现函数复用，每个子例都会拷贝一份
// 实例不是父类实例，调用instanceof(父类)会输出false

///////////////////////////////////////////////////////////

// 实例继承，为父类实例添加属性后返回。类似工厂函数。
function Pig(name) {
  const instance = new Animal(name)
  return instance
}
// 实例是父类实例，不是子类实例，不能多继承

///////////////////////////////////////////////////////////

// 拷贝继承
function Chick(name) {
  const instance = new Animal(name)
  Object.assign(Chick.prototype, instance)
}
// 效率低，不可访问不可枚举方法

///////////////////////////////////////////////////////////

// 组合继承，即构造继承 + 原型继承
function Cow(name) {
  Animal.call(this, name)
}
// 调用了两次构造函数！(子类优先级高，屏蔽父类属性)
Cow.prototype = new Animal()
// 上面重写了prototype！所以一定记得修复丢失的constructor
Cow.prototype.constructor = Cow

///////////////////////////////////////////////////////////

// 寄生组合继承(思路是，去掉第二次构造函数调用)
function Horse(name) {
  Animal.call(this, name)
}
// Horse.prototype = Object.create(Animal.prototype)
// 修复因重写prototype丢失的constructor
Horse.prototype.constructor = Horse;
(function () {
  // 用一个空的构造函数替换掉父类构造函数就行了
  const Super = function () {}
  Super.prototype = Animal.prototype
  Horse.prototype = new Super()
})()



////////////////////////扩展内容///////////////////////////////////
// 实现私有、静态属性
const People = (function (_super) {
  // 但是，请注意，这个私有的变量会被所有实例共享！！
  // 所以typescript没有选择这种私有方式
  const _name = 'this is private'

  function People(age) {
    // 继承构造函数
    _super.call(this)
    this.age = age
    this.getName = function () {
      // 获取私有属性
      return _name
    }
  }

  // Object.create可以不依赖构造函数，直接使用原型生成一个实例
  // 等价于用一个空的构造函数替换原型的构造函数再new
  // 继承原型属性
  People.prototype = Object.create(_super.prototype)
  // 上面重写了原型，修复构造函数指向
  People.prototype.constructor = People
  // 静态属性
  People.id = '233'

  return People
})(Base)

function Base() {
  this.type = 'base'
}

Base.prototype.getType = function () {
  return this.type
}

const p = new People(21)

console.log(p)
// instanceof判断右边构造函数的prototype原型是否在左边实例的__proto__原型链上
console.log(p instanceof Base) // true
console.log(p instanceof People) // true