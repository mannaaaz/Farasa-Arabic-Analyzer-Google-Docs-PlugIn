# Farasa-Arabic-Analyzer-Google-Docs-PlugIn

## Key Uses 

Integrated Farasa API into the plugin, gives users an exceptional tool for precise Arabic linguistic analysis.

Enable users working with Arabic Text on Google Docs by providing them parts-of-speech (POS) highlighting.

## Process

The system has two functionalities: 

 1- Display the linguistic information on the sidebar:

Extract the selected text (by the user) from the document.
Send the selected text to Farasa API (segmentation, lemmatization, spell checker, and diacritization).
Get Farasa’s response and display it on the sidebar. 

2- Highlight the part of speech of the selected text:

Extract the selected text (by the user) from the document.
Send the selected text to the POS Farasa API.
Highlight the selected sentence (nouns in green, verbs in blue, particles in yellow).


## Challanges 

1- Farasa API Integration Complexity:

Technical challenges. 
Data formatting. 
Error handling.

2- Latency:

Potential delays in Farasa API responses.

3- Testing:
Testing the POS highlighting feature such as, text in headers, or footers was a bit challenging. 

## Overview of the Plugin 

An easy-to-use interface with two buttons: one button to get the linguistic information, and second button to highlight the POS of the selected text.


How to open the PlugIn: 


<img width="322" alt="Screen Shot 2023-09-21 at 1 52 04 PM" src="https://github.com/mannaaaz/Farasa-Arabic-Analyzer-Google-Docs-PlugIn/assets/85847371/5e242ae9-9e0b-4554-a5e0-7ada70f88478">



Google Docs SideBar:

<img width="193" alt="Screen Shot 2023-09-21 at 1 51 18 PM" src="https://github.com/mannaaaz/Farasa-Arabic-Analyzer-Google-Docs-PlugIn/assets/85847371/a38e5cd2-f135-4691-aeeb-e52ccfd9df68">




Arabic Sentnece with nouns/verbs/parts: 


<img width="137" alt="Screen Shot 2023-09-21 at 1 52 43 PM" src="https://github.com/mannaaaz/Farasa-Arabic-Analyzer-Google-Docs-PlugIn/assets/85847371/ea682a57-d57e-48f6-b569-91e1a00bf3e9">


## Software Used 

Google App Script - 
JavaScript - 
JQuery 

## Future Work

1- Additional Features: 

Classify text/words based on readability levels and highlight them. 
Use the Named Entity Recognizer from Farasa API.
Overwrite the selected text with Farasa API response. 
Extend the plugin to more languages. 

2- User Feedback: 

Gather user feedback to make continuous improvements. 

3- Performance Optimization: 

Increase the response time and efficiency of the plugin.  

4- Updates:

Keep the plugin up-to-date with new Google Docs features. 
