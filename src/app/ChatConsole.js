var ChatConsole = {

    LogThis: function (text) {
        document.getElementById("log").innerHTML += "<br/>" + text;
        document.getElementById("toplog").scrollTop = document.getElementById("toplog").scrollHeight;
    },
    LogThisAlone: function (text) {
        document.getElementById("log").innerHTML = "<br/>" + text;
    }
};