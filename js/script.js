// ==========================
//
// OF CHATTING GUIDE
//
// ==========================

const pages = document.querySelectorAll(".page");

const navButtons = document.querySelectorAll(".nav-btn");

const modelButtons = document.querySelectorAll(".model-button");

const modelContent = document.getElementById("model-content");

const notesBox = document.getElementById("notesBox");

const search = document.getElementById("search");



// ==========================
//
// SIDEBAR
//
// ==========================

navButtons.forEach(button=>{

button.addEventListener("click",()=>{

navButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const tab=button.dataset.tab;

pages.forEach(page=>{

page.classList.remove("active-page");

});

document.getElementById(tab).classList.add("active-page");

});

});



// ==========================
//
// OPEN MODEL
//
// ==========================

modelButtons.forEach(button=>{

button.addEventListener("click",()=>{

const model=button.dataset.model;

renderModel(model);

pages.forEach(page=>page.classList.remove("active-page"));

document.getElementById("models").classList.add("active-page");

navButtons.forEach(btn=>btn.classList.remove("active"));

document.querySelector('[data-tab="models"]').classList.add("active");

});

});



// ==========================
//
// RENDER MODEL
//
// ==========================

function renderModel(name){

const model=models[name];

if(!model)return;

modelContent.innerHTML=`

<h1>

${model.name}

</h1>

<p class="tagline">

${model.tagline}

</p>

<p class="summary">

${model.summary}

</p>

${overviewCard(model)}

${personalityCard(model)}

${speechCard(model)}

${likesCard(model)}

${travelCard(model)}

${lifestyleCard(model)}

${sellingCard(model)}

${dosCard(model)}

${phrasesCard(model)}

${hooksCard(model)}

`;

initAccordions();

copyButtons();

}



// ==========================
//
// CARD
//
// ==========================

function card(title,content){

return`

<div class="profile-card">

<button class="accordion-btn">

${title}

<span>+</span>

</button>

<div class="accordion-content">

${content}

</div>

</div>

`;

}



// ==========================
//
// LIST
//
// ==========================

function list(items){

return`

<ul>

${items.map(item=>`<li>${item}</li>`).join("")}

</ul>

`;

}

// ==========================
//
// OVERVIEW
//
// ==========================

function overviewCard(model){

return card(

"📌 Overview",

`

<div class="overview-grid">

<div><strong>Birthday</strong><br>${model.overview.birthday ?? "-"}</div>

<div><strong>Location</strong><br>${model.overview.location ?? "-"}</div>

<div><strong>Relationship</strong><br>${model.overview.relationship ?? "-"}</div>

<div><strong>Ethnicity</strong><br>${model.overview.ethnicity ?? "-"}</div>

</div>

`

);

}



// ==========================

function personalityCard(model){

return card(

"✨ Personality",

list(model.personality)

);

}



// ==========================

function speechCard(model){

return card(

"🗣 How She Talks",

`

<p>

${model.speech.description}

</p>

<h4>Common Words</h4>

${chips(model.speech.shortcuts)}

<h4>Favorite Emojis</h4>

${chips(model.speech.emojis)}

`

);

}



// ==========================

function likesCard(model){

let html="";

for(const section in model.likes){

html+=`

<h4>

${capitalize(section)}

</h4>

${list(model.likes[section])}

`;

}

return card(

"❤️ Likes",

html

);

}



// ==========================

function lifestyleCard(model){

let html="";

for(const key in model.lifestyle){

const value=model.lifestyle[key];

if(Array.isArray(value)){

html+=`

<h4>

${capitalize(key)}

</h4>

${list(value)}

`;

}

else{

html+=`

<p>

<strong>${capitalize(key)}</strong>

<br>

${value}

</p>

`;

}

}

return card(

"🌿 Lifestyle",

html

);

}



// ==========================

function travelCard(model){

return card(

"✈ Travel",

`

<h4>

Visited

</h4>

${list(model.travel.visited)}

<h4>

Dream Destinations

</h4>

${list(model.travel.dream)}

`

);

}



// ==========================

function sellingCard(model){

return card(

"🔥 Selling Style",

list(model.sellingStyle)

);

}



// ==========================

function dosCard(model){

return card(

"✅ Do's & Don'ts",

`

<div class="do-grid">

<div>

<h4>

Do's

</h4>

${list(model.dos)}

</div>

<div>

<h4>

Don'ts

</h4>

${list(model.donts)}

</div>

</div>

`

);

}



// ==========================

function phrasesCard(model){

return card(

"💬 Common Phrases",

`

<div class="chip-container">

${model.phrases.map(

phrase=>`

<button

class="phrase"

data-copy="${phrase}"

>

${phrase}

</button>

`

).join("")}

</div>

`

);

}



// ==========================

function hooksCard(model){

let html="";

for(const topic in model.hooks){

html+=`

<h4>

${capitalize(topic)}

</h4>

${list(model.hooks[topic])}

`;

}

return card(

"🎯 Conversation Hooks",

html

);

}

// ==========================
//
// CHIPS
//
// ==========================

function chips(items){

return `

<div class="chip-container">

${items.map(item=>`

<span class="chip">

${item}

</span>

`).join("")}

</div>

`;

}



// ==========================
//
// CAPITALIZE
//
// ==========================

function capitalize(word){

return word.charAt(0).toUpperCase()+word.slice(1);

}



// ==========================
//
// ACCORDIONS
//
// ==========================

function initAccordions(){

const accordions=document.querySelectorAll(".accordion-btn");

accordions.forEach(button=>{

button.addEventListener("click",()=>{

const content=button.nextElementSibling;

const opened=content.classList.contains("show");

document

.querySelectorAll(".accordion-content")

.forEach(c=>{

c.classList.remove("show");

});

document

.querySelectorAll(".accordion-btn span")

.forEach(span=>{

span.textContent="+";

});

if(!opened){

content.classList.add("show");

button.querySelector("span").textContent="−";

}

});

});

}



// ==========================
//
// COPY BUTTONS
//
// ==========================

function copyButtons(){

const buttons=document.querySelectorAll(".phrase");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

navigator.clipboard.writeText(

button.dataset.copy

);

const old=button.innerHTML;

button.innerHTML="✅ Copied!";

setTimeout(()=>{

button.innerHTML=old;

},1200);

});

});

}



// ==========================
//
// NOTES
//
// ==========================

if(notesBox){

notesBox.value=

localStorage.getItem("notes")||"";

notesBox.addEventListener("input",()=>{

localStorage.setItem(

"notes",

notesBox.value

);

});

}



// ==========================
//
// SEARCH
//
// ==========================

search.addEventListener("input",()=>{

const value=

search.value.toLowerCase();

document

.querySelectorAll(".quick-card")

.forEach(card=>{

const text=

card.innerText.toLowerCase();

card.style.display=

text.includes(value)

?

"block"

:

"none";

});

});



// ==========================
//
// COPY TEMPLATE BUTTONS
//
// ==========================

document

.querySelectorAll(".copy-btn")

.forEach(button=>{

button.addEventListener("click",()=>{

const text=

button

.nextElementSibling

.value;

navigator

.clipboard

.writeText(text);

button.innerHTML="✅ Copied";

setTimeout(()=>{

button.innerHTML="Copy";

},1000);

});

});



// ==========================
//
// LOAD DEFAULT MODEL
//
// ==========================

renderModel("kiki");



// ==========================
//
// SHORTCUT
//
// CTRL + K
//
// ==========================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="k"){

e.preventDefault();

search.focus();

}

});



// ==========================
//
// END
//
// ==========================
