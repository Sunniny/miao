
function turnPredicateToFuntion(predicate){
  var func = predicate
  if(typeof predicate == 'string'){
    func = function(it){
      return it[predicate]
    }
  }else if(Array.isArray(predicate)){
    func = function(it) {
      return it[predicate[0]]===predicate[1]
    }
  }else if(typeof predicate =='object'){

  func = function(it){
    for(var key in predicate){
      if((it[key]!==predicate[key])){
        return false
      }
    }
  return true
}
  }
  return func
}
var sunniny = {
    //, null, 0, "", undefined, and NaN
    //1
  compact:function(array){
    if(!Array.isArray(array)){
      return []
    }
    var result = []
    for(var i =0;i<array.length;i++){
      if(array[i]){
        result.push(array[i])
      }
    }
    return result

},
  //2
  chunk:function(array,size){
    var result = []
    for(var i = 0;i<array.length;i+=size){
      result.push(array.slice(i,i+size))
    }
    return result
  },
//3
fill:function(array,value,start,end){
if(start||end!==undefined){
for(var j = start;j<end;j++){
  array[j]=value
}
}
else{
  for(var i =0;i<array.length;i++){
    array[i]=value
  }
}
return array
},
//4
drop:function(array,deleteCount){
  if(deleteCount!=undefined){
  array.splice(0,deleteCount)
  }else{
    array.splice(0,1)
  }
  return array
},
//12
findIndex:function(users,target,fromIndex=0){
  for(var i=fromIndex;i<users.length;i++){
  if(Array.isArray(target)){
  if(target[0] in users[i] && users[i][target[0]]==target[1] ){
    return i
  }
 
  }
  if(typeof target =='function'){
  for(let i = 0;i<users.length;i++){
    if(target(users[i])){
      return i
    }
  }
   
  }
 
  if(typeof target=="object"){
    for(let i =0;i<users.length;i++){
      let flag=true
      for(let key in target){
       if(users[i][key]!==target[key]) {
        flag=false
       }
      }
      if(flag){
        return i
      }
    }
  }
  if(typeof target=="string" ){
    if(target in users[i]&&users[i][target]){
      return i 
    }
  
  }
  }
  return -1
  },
  //5
  //findLastIndex
findLastIndex:function(array,target,fromIndex=array.length-1){
  var func = turnPredicateToFuntion(target)
  for(var i = fromIndex; i >= 0;i--){
    if(func(array[i]))
    return i
  }
},
//6
dropRight:function(array,deleteCount){
if(deleteCount!=undefined){
  if(deleteCount>=array.length){
    return []
  }else{
   array.splice(array.length-deleteCount,deleteCount)
  }
}else{
array.splice(array.length-1,1)
}
return array
},

//7
flatten:function(array){
  var result =[]
  for(var item of array){
    if(Array.isArray(item)){
      for(var it of item){
        result.push(it)
      }
    }else{
      result.push(item)
    }
  }
  return result
},
//8
flattenDeep:function(array){
var result=[]
for(var item of array){
  if(Array.isArray(item)){
   var itDeep =this.flattenDeep(item)
   for(var it of itDeep){
    result.push(it)
   }
  }
  else{
    result.push(item)
  }
}
return result
},
//9
flattenDepth:function(array,num){
if(num==0){
 return array
}
var result=[]
  for(var item of array){
    if(Array.isArray(item)){
     var flat = this.flattenDepth(item,num-1)
     for(var it of flat)
     result.push(it)
    }
    else{
      result.push(item)
    }
  }
return result
},


//sumby 10
sumBy:function(Array,iterator){
  var result = 0
  if(typeof iterator == 'string'){
    for(var i = 0;i<Array.length;i++){
      result += Array[i][iterator]
    }
  }
  else{
    for(var  i = 0; i <Array.length; i++){
      result += iterator(Array[i])
    }
  }
  return result
},
//filter 11
filter:function(array,predicate){
  func=turnPredicateToFuntion(predicate)
  var result = []
  for(var item of array){
   if(func(item))
   result.push(item)
  }
  return result
},
// 12 map
// map:function(predicate,target){
//   var result = []
//   if(Array.isArray(predicate)&&typeof target === 'string'){
//     for(var item of(predicate)){
//       if(item[target])
//       result.push(item[target])
//     }
//   }
//   if(Array.isArray(predicate)){
//     for(var item of predicate){
//       result.push(target(item))
//      }
//      return result
//   }
//   if(typeof predicate === 'object'){
//     for(var key in predicate){
//       result.push(target(predicate[key]))
//      }
//   return result
//   }
// },
//13 fromPairs(pairs)
fromPairs: function(pairs) {
  var obj = {}
  for(var key of pairs){
    obj[key[0]] = key[1]
  }
  return obj
},
//14 toPairs(object)
toPairs: function(object) {
  var ary = []
  for(var key in object) {
    ary.push([key,object[key]])
  }
  return ary
},
//15head
head: function(array) {
  if(array[0] == null) {
    return undefined
  }else {
    return array[0]
  }
},
//16indexOf
indexOf: function(array, value, fromIndex = 0) {
  if(fromIndex < 0){
    fromIndex = 0
  }
  for(var i = fromIndex; i < array.length; i++) {
    if(array[i] == value){
      return i
    }
  }
  return -1
},
// lastIndexOf--17
lastIndexOf: function(array, value, fromIndex=array.length-1){
  for(var i = fromIndex; i > 0; i--){
    if(array[i] == value){
      return i
    }
   }
  return -1
},
//initial--18
initial: function(array){
  return array.slice(0,array.length-1)
},
//join--19
join: function(array, separator=','){
  var str = ''
  for(var item of array){
    str += `${item}`+ separator
  }
  return str.slice(0,str.length - 1)  
},
//last==20
last: function(array){
  if(!array){
    return 
  }else{
    return array[array.length - 1]
  }
},
//pull=21
pull: function(array, ...vals){
  for(var one of vals){
    for(var i = 0; i < array.length; i++){
      if(one == array[i]){
        array.splice(i,1)
      }
    }
  }
  return array
},
//reverse===22
reverse: function(array) {
  var ary = []
  for(var i = array.length - 1; i >=0; i--) {
    ary.push(array[i])
  }
  return ary
},
//every=23
every: function(collection,predicate) {
  var func = turnPredicateToFuntion(predicate)
  for(var item of collection) {
   if(!func(item)) {
     return false
   }
  }
 return true
},
//24 every
some: function(collection,predicate) {
  var func = turnPredicateToFuntion(predicate)
  for(var item of collection) {
    if(func(item)) {
      return true
    }
  }
  return false
},
//25 countBy
countBy: function(collection, iteratee){
  var obj ={}
  var iteratee = turnPredicateToFuntion(iteratee)
  for(var item of collection) {
    if(iteratee(item) in obj){
      obj[iteratee(item)]++
    }else {
      obj[iteratee(item)] =1
    }
  }
  return obj
  },
  //26 groupBy
  groupBy: function(collection, iteratee) {
    var obj = {}
    var iteratee = turnPredicateToFuntion(iteratee)
    for(var item of collection) {
      if(iteratee(item) in obj) {
        obj[iteratee(item)].push(item)
      }else{
        obj[iteratee(item)] = [item]
      } 
    }
    return obj
  },
  //27.keyBy
keyBy: function(collection, iteratee) {
  var iteratee = turnPredicateToFuntion(iteratee)//返回需要的功能函数
  var obj = {}//用于返回的最终对象
  for(var item of collection) {
    obj[iteratee(item)] = item
  }
  return obj
},
//28:forEach 
forEach:function(collection,iteratee){
  for(var key in  collection) {
    iteratee(collection[key], key,collection)
  }
  return collection
},
//29:map
map: function(collection,iteratee) {
  var iteratee = turnPredicateToFuntion(iteratee)
  var array = []
  if(Array.isArray(collection)){
    for(var i=0; i<collection.length; i++){
      array.push(iteratee(collection[i], i, collection))
    }
  }else if(typeof collection == 'object'){
    for(key in collection) {
      array.push(iteratee(collection[key]))
    }
  }
  return array
},
//30reduce
reduce: function(collection,iteratee,aaccumulator=0) {
  var res = aaccumulator
  for(var key in collection) {
    res = iteratee(res, collection[key], key)
  }
  return res
},
}



