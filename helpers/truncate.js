module.exports = function(context){
  if(!context){
    return '';
  }
  return truncate(context, 4);


  function truncate(bodyString, length) {
    if (length === null) {
      length = 20;
    }
    
    var split = bodyString.split('\n');

    if (split.length <= length) {
      return bodyString;
    }
    return split.slice(0, length).join('\n') + '\n...';
  }

};
