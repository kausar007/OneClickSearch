// Copyright (c) 2013 Kausar Mehmood. All rights reserved.
//One search js file: Background script which runs with extension.

//Function for searching text in given website
function searchText(info)
{
 var searchstring = info.selectionText;
 var urlstring = localStorage["engines"];
 var urls = JSON.parse(urlstring);
 var selectedEngine = localStorage["search"];
 chrome.tabs.create({url: urls[selectedEngine] + searchstring});
}

//Function for updating context menu whenever engine is changed.
function update()
{
	chrome.contextMenus.update(contextMenu, {title: "Search " + localStorage["search"] + " for '%s'", contexts:["selection"], onclick: searchText} );
	console.log("updates now");
}

//if engines not previously stored, store default ones in local storage.
var engines = localStorage["engines"];
if (!engines)
{
	var defaultEngines = { youtube:"http://www.youtube.com/results?search_query=",
							maps:"http://maps.google.com/maps?q=",
							wolfram:"http://www.wolframalpha.com/input/?i="
						};

	var enginesString = JSON.stringify(defaultEngines);
	localStorage["engines"] = enginesString;
}

//if current search engine not selected, select youtube as default.
var search = localStorage["search"];
if(!search)
{
	localStorage["search"] = "youtube";
}

//Create Context Menu
var contextMenu = chrome.contextMenus.create({title: "Search " + localStorage["search"] + " for '%s'", contexts:["selection"], onclick: searchText});