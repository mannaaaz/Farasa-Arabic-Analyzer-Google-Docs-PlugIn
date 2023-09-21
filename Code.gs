// runs when the add-on is open 
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Farasa Tools', 'FarasaToolsSideBar')
      .addToUi();
      // new attempt 
  // DocumentApp.getUi().createMenu('My Menu')
  //     .addItem('Show dialog', 'showDialog')
  //     .addToUi();
      
}

// runs when the add-on is installed.
function onInstall(e) {
  onOpen(e);
}

// /** This function displays a custom sidebar in Google Docs generated from the HTML file named SideBar.html */
function FarasaToolsSideBar() {
  const ui = HtmlService.createHtmlOutputFromFile('SideBar.html')
      .setTitle('Farasa Arabic Analyzer Plugin');
  DocumentApp.getUi().showSidebar(ui);
}

function showDialog() {
  var html = HtmlService.createHtmlOutputFromFile('Page')
      .setWidth(300)
      .setHeight(200);
      
  DocumentApp.getUi() 
      .showModalDialog(html, 'My custom dialog');
}

// step1
// from https://github.com/CAMeL-Lab/samer-add-on
// retrieves the selected text from the Google Docs document. 
//It checks if there is any text selection and returns an object containing the selected text and the starting offset. 
// If no text is selected, it returns the entire text from the document body. 
function getTextStr(checkSelection=true){
  let selection = DocumentApp.getActiveDocument().getSelection();

  if (checkSelection && selection) {
    let elements = selection.getRangeElements();
    let text = "";
    let startOffset = 0;
    for (let rangeElement of elements){
      //check if element is text
      if (rangeElement.getElement().editAsText) {
        let element = rangeElement.getElement();
        let elementText = element.asText().getText();
        // Is only part of the paragraph selected?
        if (rangeElement.isPartial()){
          startOffset = rangeElement.getStartOffset();    
          let endOffset = rangeElement.getEndOffsetInclusive();
          // if part of a word is selected, look for whitespace boundary
          while (startOffset > 0){
            //Logger.log(startOffset)
            if (elementText[startOffset].match(/\s/g)){
              startOffset+=1;
              break;
            }
              
            if (!elementText[startOffset].match(/\s/g))
              startOffset-=1;
          }

          while(endOffset < elementText.length){
            if(elementText[endOffset].match(/\s/g)){
              endOffset -= 1;
              break;
            }
              
            if (!elementText[endOffset].match(/\s/g))
              endOffset+=1;
          }

          elementText = elementText.substring(startOffset,endOffset+1);
          //console.log(elementText);
          //Logger.log(elementText)
        }
        if(text === "") text = elementText;
        else text = text + " " + elementText;

         Logger.log(text); // Log the extracted text
      }
    }
    return {text, startOffset}; 
  } else { 
    const text = DocumentApp.getActiveDocument().getBody().editAsText().getText()
    return {text,
            /*startOffset: 0*/};
  }
}


// step 2
// API calls 
// 1- Segmentation: works corrrectly // not woking 
// calls the Farasa API for text segmentation using the selected text. It sends a POST request to the API, retrieves the response, 
// and returns the segmented text.


function callSegmentationAPIwithSelected() {
  try {
    const url = 'https://farasa.qcri.org/webapi/segmentation/'; //1
  const selectedText = getTextStr();
    // Check if multiple text selections are made and handle accordingly
  if (selectedText.length > 1) {
    throw new Error('Please select only one text.');
  }
  const vals = {"text":selectedText.text, "api_key":"XXXXXXXXXXXXX"}
   const opts = {
      'method': 'post',
      'contentType': 'application/json',
      'muteHttpExceptions': true,
      'payload': JSON.stringify(vals)
  }

  const rep = UrlFetchApp.fetch(url, opts);
  const data = rep.getContentText();
  var output = JSON.parse(data)["text"];
  //var cleanedText = apiResponse.replace(/,\s+/g, ""); later 
  Logger.log(output)
  return output;
  } catch (error) {
    // Handle the error here
    Logger.log('Error in callSegmentationAPIwithSelected: ' + error);
    return null; // Or any value that indicates an error
  } 
}

// 2- Lemmatization: working correctly 
function CallLemmatizationAPIwithSelected() {
  try {
    const url = 'https://farasa.qcri.org/webapi/lemmatization/'; //1
    const selectedText = getTextStr();
      // Check if multiple text selections are made and handle accordingly
    if (selectedText.length > 1) {
      throw new Error('Please select only one text.');
    }
    const vals = {"text":selectedText.text, "api_key":"XXXXXXXXXXXXX"}
    const opts = {
        'method': 'post',
        'contentType': 'application/json',
        'muteHttpExceptions': true,
        'payload': JSON.stringify(vals)
    }

    const rep = UrlFetchApp.fetch(url, opts);
    const data = rep.getContentText();
    var output = JSON.parse(data)["text"];
  
    Logger.log(output)
    return output;
  } catch(error) { 
    // Handle the error here
    Logger.log('Error in CallLemmatizationAPIwithSelected: ' + error);
    return null; // Or any value that indicates an error
  }
} 

// 3- Spell Check: working correctly  
// later add a condition: if nothing was returned: write. 
function callSpellCheckAPIwithSelected() {
  try {
  const url = 'https://farasa.qcri.org/webapi/spellcheck/'; //1
  const selectedText = getTextStr();
    // Check if multiple text selections are made and handle accordingly
  if (selectedText.length > 1) {
    throw new Error('Please select only one text.');
  }
  const vals = {"text":selectedText.text, "api_key":"XXXXXXXXXXXXX"}
   const opts = {
      'method': 'post',
      'contentType': 'application/json',
      'muteHttpExceptions': true,
      'payload': JSON.stringify(vals)
  }

  const rep = UrlFetchApp.fetch(url, opts);
  const data = rep.getContentText();
  var output = JSON.parse(data)["text"];
  
  Logger.log(output)
  return output;
  } catch(error) {
     // Handle the error here
    Logger.log('Error in callSpellCheckAPIwithSelected: ' + error);
    return null; // Or any value that indicates an error
  }
} 


// 4- Diacritization: working correctly 
function callDiacritizationAPIwithSelected() {
  try {
  const url = 'https://farasa.qcri.org/webapi/diacritize/'; //1
  const selectedText = getTextStr();
    // Check if multiple text selections are made and handle accordingly
  if (selectedText.length > 1) {
    throw new Error('Please select only one text.');
  }
  const vals = {"text":selectedText.text, "api_key":"XXXXXXXXXXXXX"}
   const opts = {
      'method': 'post',
      'contentType': 'application/json',
      'muteHttpExceptions': true,
      'payload': JSON.stringify(vals)
  }

  const rep = UrlFetchApp.fetch(url, opts);
  const data = rep.getContentText();
  var output = JSON.parse(data)["text"];
  
  Logger.log(output)
  return output;
  } catch(error) {
     // Handle the error here
    Logger.log('Error in callDiacritizationAPIwithSelected: ' + error);
    return null; // Or any value that indicates an error
  }
} 

// 5- POS Tagging: do not take long text // only this !! 
function callPOSAPIwithSelected() {
  try {
  var api_key = "XXXXXXXXXXXXX"
   const selectedText = getTextStr();
   Logger.log(selectedText)
  
  
  // Check if multiple text selections are made and handle accordingly
  if (selectedText.length > 1) {
    throw new Error('Please select only one text.');
  }

  const text = selectedText.text; // Access the 'text' property of the selectedText object
  Logger.log(text)

  var url = "https://farasa.qcri.org/webapi/pos/?text=" + encodeURIComponent(text) + "&api_key=" + encodeURIComponent(api_key);
  var options = {
    method: "post",
    contentType: "application/json; charset=UTF-8",
    headers: {
      "Accept": "application/json"
    }
  };

var response = UrlFetchApp.fetch(url, options);
Logger.log(response)
var parsedResponse = JSON.parse(response.getContentText());
Logger.log(parsedResponse) 

return parsedResponse
  } catch(error) {
      // Handle the error here
    Logger.log('Error in callPOSAPIwithSelected: ' + error);
    return null; // Or any value that indicates an error
  }
}


// step 3

// highlights words based on their Part-Of-Speech (POS) tags. 
// It uses the callPOSAPIwithSelected() function to get the POS-tagged text and filters out words based on the provided partOfSpeech. 
//It then iterates through the words to highlight them in the Google Docs document with the specified highlightColor.
function highlightWordsByPartOfSpeechOPT(partOfSpeech, highlightColor) {
  try {
  var body = DocumentApp.getActiveDocument().getBody(); //gets the body of the currently active Google Docs document. getBody(): retrieves the main content of the doc.
  try { 
  var selectedWordTags = callPOSAPIwithSelected(); // calls the callPOSAPIwithSelected() function to retrieve the Part-of-Speech (POS) tags for the selected text. 
  } catch(error) {
    console.error("An error occurred:", error);
  }
  const selectedText = getTextStr(); // calls the getTextStr() function to retrieve the selected text from the Google Docs document. 
  const text = selectedText.text; 

  Logger.log("selectedWordTags")
  Logger.log(selectedWordTags)
 
  //filters the selectedWordTags array to only keep the elements that have a specific part-of-speech tag
  // filter() => is used to iterate through the selectedWordTags.text array and keep the elements that satisfy the condition of having the specified part-of-speech tag. 
  var wordTags = selectedWordTags.text.filter(wordTag => wordTag.POS.includes(partOfSpeech)); 
  var searchResult; 
  //proceeds to iterate over each element in the wordTags array using the wordTags.forEach() method. For each element (representing a word with the desired POS tag), 
  //the function performs the following steps: 
  wordTags.forEach(wordTag => { 
    var wordToHighlight = wordTag.surface.replace(/\+/g, ""); // 1-extracts the word from the current element and remove '+'  to get the original word.
    var wordsToHighlight = wordToHighlight.split(" "); // 2-  splits the wordToHighlight string into an array of words using space (' ') as the separator. 
    var wordToHighlight = wordsToHighlight.join(""); // 3-  joins the array of words back into a single string with no space as a separator to ensure that wordToHighlight variable contains the entire word without any spaces between its parts.
    searchResult = body.findText(wordToHighlight); // 4- searches for the wordToHighlight in the Google Docs document's body using the findText() method. 
    // then enters the while loop 
    while (searchResult !== null) {
      var foundElement = searchResult.getElement(); // 1- gets the element ( paragraph or a text section) where the search result was found.
      var foundText = foundElement.asText(); // 2- converts the found element into a Text object to be able to modify it. 
      var start = searchResult.getStartOffset(); // 3- retrieves the starting offset of the found text within the Text object.
      var end = searchResult.getEndOffsetInclusive(); // 4-retrieves the ending offset of the found text within the Text object.

      //sets the background color of the found text from the starting offset start to the ending offset end with the specified highlightColor.
      foundText.setBackgroundColor(start, end, highlightColor); 
      searchResult = body.findText(wordToHighlight, searchResult); // looks for the next occurrence of wordToHighlight after the current search result by providing the searchResult object as the second argument. It allows the findText() method to continue the search from where it left off.
       
       return foundText
    }
  });
  } catch(error) {
    Logger.log('Error in : highlightWordsByPartOfSpeechOPT' + error);
    return null; // Or any value that indicates an error
  }
}


function highlightWordsWithMultiplePOS() {
  highlightWordsByPartOfSpeechOPT("NOUN", "#00FF00"); // Green color for nouns
  highlightWordsByPartOfSpeechOPT("V", "#ADD8E6"); // Light blue color for verbs
  highlightWordsByPartOfSpeechOPT("PART", "#FFFF00"); // Yellow color for particles
}
