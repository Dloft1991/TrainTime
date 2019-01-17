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

    name = $("#tname").val().trim();
    destination = $("#tdestination").val().trim();
    time = $("#ttime").val().trim();
    frequency = $("#tfrequency").val().trim();

    // push it to the limit! I mean database
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    console.log(database);

    // clear the input feilds
    $("#tname").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    name = childSnapshot.val().name;
    destination = childSnapshot.val().destination;
    time = childSnapshot.val().time;
    frequency = childSnapshot.val().frequency;


    // make that row tho
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(time),
        $("<td>").text(frequency),
    );

    $("#newtrain").append(newRow);
});
