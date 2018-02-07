module.exports = {
  fileNameArray: function(files){
    var array = [];

    files.forEach(function(file){
      array.push(file.originalname);
    });

    return array;
  },

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
  },

  cleanArray: function(array){
    //removes punctiation and filler words
    var cleanArray = [];

    array.forEach(function(pair){
      var word = pair[0];
      var oWord = pair[0].toLowerCase();
      word = word.toLowerCase().split(""); //make the word lowercase

      if (word.length > 0 && oWord != "i" && oWord != "the" && oWord != "to" && oWord != "and"
            && oWord != "of" && oWord != "a" && oWord != "is" && oWord != "in" && oWord != "this"
            && oWord != "be" && oWord != "on" && oWord != "at" && oWord != "that" && oWord != "my"
            && oWord != "just" && oWord != "for" && oWord != "so" && oWord != "an" && oWord != "it"
            && oWord != "as" && oWord != "me"){ //initial filter
        for (var i=0; i<word.length; i++){ //remove punctuation
          if (word[i] === "\'") {
            //catch words with apostrophe
          } else if (word[i] === "!" || word[i] === "," || word[i] === "?" || word[i] === "."){
            word.splice(i, 1);
          }
        }
        pair[0] = word.join("");
        cleanArray.push(pair);
      }
      // cleanArray.push(pair);
    });

    return cleanArray;
  },

  //input the array of fileData
  extractTimeData: function(array){
    var dataSet = [];

    array.forEach(function(file){
      var entry = file.buffer.toString("utf8").split(" ");
      var tempArray = [];

      for (var i=0; i<entry.length; i++){
        var matchTime = /\d{1,2}:/;
        var matchCase = matchTime.test(entry[i]);


        if (matchCase) {
          //time comes first, so match that and the following two things
          //which are the rating and the word
          tempArray.push(entry[i].replace(/\n/g,""), entry[i+1].replace(/;/g,""), entry[i+2].replace(/\n/g,""));
        }
      }

      //clean the temp array from the /n's and other shiz
      // [ '2.6.2018.txt\n\n7:45am;',
      // '9.2/10;',
      // 'preparing\n\nJust',
      tempArray.forEach(function(el){

      });

      console.log("THIS IS THE TEMP ARRAY", tempArray);
      dataSet.push(tempArray);
    });



    return dataSet;
  }
}




















// fin
