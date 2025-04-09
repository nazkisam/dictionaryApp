const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  getWordInfo(form.elements[0].value);


});

const getWordInfo = async(word)=>{
const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
const data = await response.json();
console.log(data); 

let definitions = data[0].meanings[0].definitions[0]
resultDiv.innerHTML = `

<h2> <strong>Word: </strong>${data[0].word}</h2>
<p>${data[0].meanings[0].partOfSpeech[0]}</p>

<p><strong>Meaning: </strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p> 

 <p><strong>Example: </strong>${definitions.example === undefined ? "Not Found" : 
definitions.example}</p>


<p><strong>Antonyms</strong></p>


`;

if(definitions.antonyms.length === 0 ){
 resultDiv.innerHTML+= `<span>Not Found</span>`
}
else{
for(let i = 0 ; i<definitions.antonyms.length; i++){
 
  resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
}}


for(let i = 0; i<definitions.synonyms.length; i++){
  
  resultDiv.innerHTML += `<li> ${definitions.synonyms[i]}</li>`
}


 


}
