module.exports = {
  countWords: function(string){
    var wordCount = {};
    var words = string.split(/\s/);

    for (let i=0; i<words.length; i++){
      wordCount[words[i]] = (wordCount[words[i]] || 0) + 1;
    }

    return wordCount;
  },

  fileArrayToFrequencyArray: function(fileArray){
    var allFileString, wordFrequencyObject, wordFrequencyArray;

    fileArray.forEach(function(file){
        var entry = file.buffer.toString("utf8"); //convert to string for JS reading/compatibility
        fileArray.push(entry); //put each file into array
        allFileString += entry; // concat each file into string
    });

    wordFrequencyObject = this.countWords(allFileString);
    wordFrequencyArray = Object.entries(wordFrequencyObject).sort(function(a,b){
      return a[1] - b[1];
    });

    wordFrequencyArray = wordFrequencyArray.reverse();

    return wordFrequencyArray;
  }
}




















// fin
