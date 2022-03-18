

/*******************************
 * 
 * Author 		Emma Callahan
 * Class 		WP1
 * Assignment 	Lab2
 * Date 		11/15/2021
 *
 ********************************/


//submit button

 function submit() {
   let input = document.getElementById("text").value;
   let output = document.getElementById("output");

   let translation = document.createElement("p");

   translation.innerHTML = pigPhrase(input);
   output.appendChild(translation).style.fontSize = "3rem";
 }

 //translate function 

 function pigPhrase(string) {

   //create response if user doesnt type anything
   if (string == "") {
     return "Whoops! please enter a phrase to translate.";
   }

   //create array for vowels
   let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

   //split the sentence into an array of words
   let sentence = string.split(/(?=[!?.,])|[_-\s]/).filter((x) => x);
   let result = [];

   //run through sentence array and translate each word
   for (let i = 0; i < sentence.length; i++) {
     let array = sentence[i].split(/([aeiouAEIOUyY])/).filter((x) => x);
     let firstLetter = "";


     if (/[^a-zA-Z]/.test(array[0])) {
       firstLetter = "punc";
     } else if (/[yY]/.test(array)) {
       firstLetter = "y";
     } else if (vowels.indexOf(array[0]) != -1) {
       firstLetter = "vowel";
     }

    
     switch (firstLetter) {
       case "punc":
         break;
       case "y":
         if (/[aeiouAEIOU]/.test(array)) {
           while (vowels.indexOf(array[0].charAt(0)) == -1) {
             array.push(array.shift().toLowerCase());
           }
           array.push("ay");
         } else {
           array.push(array.shift().toLowerCase());
           array.push("ay");
         }
         break;
       case "vowel":
         if (/[yY]/.test(array[array.length - 1])) {
           array.push("ay");
         } else {
           array.push("yay");
         }
         break;
       default:
         array.push(array.shift().toLowerCase());
         array.push("ay");
         break;
     }

     //capitalize the first letter of the sentence or any capitalized word
     if (
       i == 0 ||
       sentence[i].charAt(0) == sentence[i].charAt(0).toUpperCase()
     ) {
       array[0] = array[0].charAt(0).toUpperCase();
     }

     //output the array of strings
     result.push(array.join(""));
   }

   //return final string removing uncessary spaces in punctuation
   return result.join(" ").replace(/\s([?.!,])/, "$1");
 }
