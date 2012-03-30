// SDN Forum Search using SAPUI5 SearchField widget

// Turn down SAPUI5's verbosity
jQuery.sap.log.setLevel(jQuery.sap.log.LogLevel['WARNING']);

// Pull the forum/URL info in
var oSdnForumMap, aSdnForums;
jQuery.get('foruminfo.json', function (data) {
    oSdnForumMap = JSON.parse(data);
    aSdnForums = Object.keys(oSdnForumMap);
});

// Filter the forums according to the given prefix
var filterSdnForums = function (sTerm) {
    var re = new RegExp(sTerm,"i")
    var aResult = [];
    for (var i = 0; i < aSdnForums.length; i++) {
        if (!sTerm || sTerm.length == 0 || re.test(aSdnForums[i])) {
            aResult.push(aSdnForums[i]);
        }
    }
    return aResult;
};

// Handle the suggest events of the search field
var doSuggest = function (oEvent) {
    var sVal = oEvent.getParameter("value");
    var aSuggestions = filterSdnForums(sVal);
    //console.log("+++ Suggestions: " + aSuggestions);
    var oSearchControl = sap.ui.getCore().byId(oEvent.getParameter("id"));
    oSearchControl.suggest(sVal, aSuggestions);
};

// Create a simple SearchField widget with suggestion list
var oSdnSearch = new sap.ui.commons.SearchField("sdnSearch", {
    startSuggestion: 2,
    search: function (oEvent) {
        var topic = oEvent.getParameter("query");
        alert("Search triggered: " + topic + " -> " + oSdnForumMap[topic]);
    },
    suggest: doSuggest
});

// Attach the widget to the page
oSdnSearch.placeAt("searchWidget");
