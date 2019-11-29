// Thank you: https://html-online.com/articles/get-url-parameters-javascript/

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    // console.log(vars);
    return vars;
}

/*
var number = getUrlVars()["x"];
var mytext = getUrlVars()["text"];
*/

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    // console.log(urlparameter);
    return urlparameter;
}


// var mytext = getUrlParam('text','Empty');