// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVsrSfLoXwT6gJ-ilC0Ck5WMWa6WxfXBQ",
    authDomain: "traintime-931c3.firebaseapp.com",
    databaseURL: "https://traintime-931c3.firebaseio.com",
    projectId: "traintime-931c3",
    storageBucket: "",
    messagingSenderId: "815732147124"
};
firebase.initializeApp(config);

const database = firebase.database();

//variables
var name = "";
var destination = "";
var time = "";
var frequency = "";

$("#submit").on("click", function (event) {
    //   alert("working");
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // push it to the limit! I mean database
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});