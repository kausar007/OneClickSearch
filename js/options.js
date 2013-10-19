// Copyright (c) 2013 Kausar Mehmood. All rights reserved.
//options js file : script which runs through options html file.

//Function for getting engines from local storage and showing each of them as radio button.
function main(){
  var urlstring = localStorage["engines"];
  var urls = JSON.parse(urlstring);
  var hm='<h1><span>Choose search engine: </span></h1>';
  hm += '<ul>';
  for(key in urls){
    hm += '<li class="';
    hm += left_right();
    hm += '"><input type="radio" name="search" value="';
    hm += key;
    hm += '" id="';
    hm += key;
    hm += '">';
    hm += key.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    hm += '</li>';
  }
  document.getElementById('engines').innerHTML = hm;
}

function left_right(){
  if(flag){
    flag = false;
    return "left";
  }
  else{
    flag = true;
    return "right";
  }
}

// Saves selected search engine to localStorage.
function save_selected() {
  var options = document.getElementsByName("search");
  var selected;
  for(var i = 0; i < options.length; i++) {
     if(options[i].checked == true) {
         selected = options[i].id;
     }
   }
  localStorage["search"] = selected;
  //chrome.contextMenus.removeAll();
  //chrome.extension.getBackgroundPage().window.location.reload();
  chrome.extension.getBackgroundPage().update();
    // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores selected search engine from localStorage.
function restore_selected() {
  var stored = localStorage["search"];
  if (!stored) {
    document.getElementById("youtube").checked = true;
    return;
  }
  document.getElementById(stored).checked = true;
}

//Function for adding new search engine
function add_new(){
  var urlstring = localStorage["engines"];
  var urls = JSON.parse(urlstring);
  var name = document.getElementById("name").value;
  var url = document.getElementById("url").value;
  urls[name]=url;
  var enginesString = JSON.stringify(urls);
  localStorage["engines"] = enginesString;
  main();
}

function delete_selected(){
  var urlstring = localStorage["engines"];
  var urls = JSON.parse(urlstring);
  var options = document.getElementsByName("search");
  var selected;
  for(var i = 0; i < options.length; i++) {
     if(options[i].checked == true) {
         selected = options[i].id;
     }
   }
  delete urls[selected];
  var enginesString = JSON.stringify(urls);
  localStorage["engines"] = enginesString;
  main();
}

var flag = true;
//Call main and restore after DOM content is loaded
document.addEventListener('DOMContentLoaded', function(){
  main();
  restore_selected();
});

// set event listener for save button
document.querySelector('#save').addEventListener('click', save_selected);
document.querySelector('#add').addEventListener('click', add_new);
document.querySelector('#delete').addEventListener('click', delete_selected);