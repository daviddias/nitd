module.exports = function(context){
  if(!context){
    return 'none';
  }
  var result = '';
  for(var i=0;i<context.length;i++){
    result = result + context[i].name;
    if (i !== context.length - 1 ) {
      result = result + ' | ';
    }
  }
  return result;
};