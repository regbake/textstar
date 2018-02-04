module.exports = {
  test: function(){
    console.log("help world!")
  },

  countWords: function(string){
    var wordCount = {};
    var words = string.split(/\s/);

    for (let i=0; i<words.length; i++){
      wordCount[words[i]] = (wordCount[words[i]] || 0) + 1;
    }

    return wordCount;
  },

  consolidateTextArray: function(array){

  }
}




















// fin
