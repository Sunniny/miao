class MyMap{
  constructor(){
    this._keys=[]
    this._vals=[]
  }
  set(key,val){
    //设置key的映射目标,如果不存在,增加一组映射,如果存在,就修改  obj[key]=val
    var keyIdx = this._keys.indexOf(key)
    if(keyIdx>=0){
      this._vals[keyIdx]=val
    }else{
      this._keys.push(key)
      this._vals.push(key)
    }
  }

  get(key){
    //获取key的映射目标 obj[key]
    var keyIdx = this._keys.indexOf(key)
    if(keyIdx>=0){
      return this._vals[keyIdx]
    }
  }

  has(key){
    //判断是否存在key这个映射目标 key in obj
    if(this._keys.includes(key)){
      return true
    }else{
      return false
    }
  }

  delete(key){//删除key及key的映射 delete obj[key]
    var keyIdx = this._keys.indexOf(key)
    if(keyIdx>=0){
      this._vals.splice(keyIdx,1)
      this._keys.splice(keyIdx,1)
      return true
    }else{
      return false
    }
  
  }

  get size(){
    return this._keys.length
  }
}

class MySet{
constructor(){
  this.elements=[]
}
add(val){
  if(!this.has(val)){
    this.elements.push(val)
  }
}
remove(val){
  if(this.has(val)){
    var idx = this.elements.indexOf(val)
    this.elements.splice(idx,1)//从下标idx开始 包含idx 删除1个元素
  }
}

has(val){
   //返回boolean
   return this.elements.includes(val)
}
get size(){
    //不接参  返回number
  return this.elements.length
}
}


/**
* 
* Vector
plus()
minus()
length
*/
class Vector{
constructor(x,y){
  this.x=x
  this.y=y
}
plus(vector){
  var x = this.x + vector.x
  var y = this.y + vector.y
  return new Vector(x,y)
}
minus(vector){
  var x = this.x - vector.x
  var y = this.y - vector.y
  return new Vector(x,y)
}
get length(){
  return Math.sqrt(this.x**2+this.y**2)
}
}

/* 
*
*Complex
*plus()
*minus()
* mul()
* div()
*

**/

class Complex{
constructor(real,imag){
  this.real=real
  this.imag=imag
}
plus(c){
  var real = this.real+c.real
  var imag = this.imag+c.imag
  return new Complex(real,imag)
}
minus(c){
  var real = this.real-c.real
  var imag = this.real-c.real
  return new Complex(real,imag)
}

mul(c){
  var real = this.real*c.real+this.imag*c.imag
  var imag = this.real*c.imag-c.real*this.imag
  return new Complex(real,imag)
 }

 div(c){
  var help = new Complex(c.real,-c.imag)
  var up = this.mul(help) 
  var down = c.mul(help)
  var real = up.real/down.real
  var imag = up.imag/down.real
  return new Complex(real,imag)
 }
}

/**
 * Stack
*push()
*pop()
*size 
 * 
 * */ 

class Stack{
  constructor(){
    this.head=null
    this.nodeStack=0
  }
  add(val){
    this.nodeStack++
    var node = {
      val,next:null
    }
  if(this.head==null){
    this.head=node
  }else{
  //栈只有一个头节点 因为是在最外面进行添加和删除元素的,故保证每添加一个元素,让head指向这个添加的元素,方便下一次进行操作(删除或添加)//其实相当于 每一次在表头添加元素
    node.next=this.head
    this.head=node
  }
  }

  pop(){
    if(this.head==null){
      return undefined
    }
  this.nodeStack--
  var result=this.head.val
  this.head=this.head.next//如果只有一个元素,取出之后进行这步操作,相当于this.next为空,this.head=this.next 也为空
  return result
  }
  get size(){
   return this.nodeStack
  }
}

/**
 * Queue
add()
pop()
size
 */
class Queue{
constructor(){
  this.head=null
  this.tail=null
  this.nodeCount=0
}

add(val){
  this.nodeCount++
  var node={
    val,next:null
  }
if(this.head==null){
  this.head=this.tail=node
}
else{
  this.tail.next=node
  this.tail=node
}
}

pop(){
    //如果为空
if(this.head==null){
  return undefined
}
this.nodeCount--
//如果只有一个节点
if(this.head.next==null){
  var result = this.head.val
  this.head==this.tail==null
  return result
}
//如果不是上述两种情况
var result = this.head.val
this.head=this.head.next
return result
}

get size(){
  return this.nodeCount

}
}

/**
* LinkedList
append()
prepend()
at()
size
*/
class LinkedList{
constructor(){
  this.head=null
  this.tail=null
}
append(val){
var node={
  val,next:null
}
if(this.head==null){
  this.head=this.tail=node
  return 
}else{
  this.tail.next=node
  this.tail=node
  return 
}
}

//往链表的头部增加一个元素
prepend(val){
var node={
  val,next:null
  }
  if(this.head==null){
    this.head=this.tail=node
    return 
  }else{
    node.next=this.head
    this.head=node
    return 
  }
}

at(idx){
var count=1
var p =this.head
while(count<idx){
p=p.next
count++
}
return p.val
}

get size(){
var p=this.head
var l=0
while(p){
p=p.next
l++
}
return l
}
}
