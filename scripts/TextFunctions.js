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
            && oWord != "as" && oWord != "me" && oWord != "things" && oWord != "i'm" && oWord != "it's"
            && oWord != "about" && oWord != "really" && oWord != "that's" && oWord != "but" && oWord != "what"
            && oWord != "all" && oWord != "with" && oWord != "get" && oWord != "some"){ //initial filter
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
    const dataSet = [];

    array.forEach(function(file){
      const entry = file.buffer.toString("utf8").split(" ");
      const tempArray = [];

      for (var i=0; i<entry.length; i++){
        var matchTime = /\d{1,2}:/;
        var matchCase = matchTime.test(entry[i]);

        if (matchCase) {
          //time comes first, so match that and the following two things
          //which are the rating and the word
          let time = entry[i].replace(/\n/g," ").split(" ")[2];
          // time = time.replace(/;/, "");
          let rating = entry[i+1].replace(/;/g, "");
          let word = entry[i+2].replace(/\n/g," ").split(" ")[0];

          tempArray.push(time, rating, word);
        }
      }

      // console.log("THIS IS THE Tmp ARRAY", tempArray);
      dataSet.push(tempArray);
    });

    console.log("From extractTimeData: ", this.convertData());
    return dataSet;
  },

  //TODO cleanse the dataSet and turn into objects
  convertData: function(dataSet){
      const Format = class {
          constructor(time, rate, word){
              this.time = time;
              this.rate = rate;
              this.word = word;
          }

          greet() {
              return "Howdy!!";
          }
      }

      const test = new Format(["6am"], [9.1], ["foobar"]);
      console.log("from convert data", test.greet())

      return test;
  }
}




















// fin
