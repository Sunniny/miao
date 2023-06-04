var sunniny = {
    //, null, 0, "", undefined, and NaN
  compack:function(array){
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
  
  chunk:function(array,size){
    var result = []
    for(var i = 0;i<array.length;i+=size){
      result.push(array.silce(i,size))
    }
    return result
  },

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

drop:function(array,deleteCount){
  if(deleteCount!=undefined){
array.splice(a,deleteCount)
  }else{
    array.splice(0,1)
  }
  return array
}

}
