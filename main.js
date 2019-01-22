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


$("#submit").on("click", function (event) {
    //   alert("working");
    event.preventDefault();

    var trainName = $("#tname").val().trim();
    var destination = $("#tdestination").val().trim();
    var firstTrain = $("#ttime").val().trim();
    var freq = $("#tfrequency").val().trim();

    // push it to the limit! I mean database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
    });
    console.log(database);

    // clear the input feilds
    $("#tname").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    //time diff

    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    var tminusTrain = diffTime % newFreq;

    var tMinutesTillTrain = newFreq - tminusTrain;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");



    $("#all-display").append(
        ' <tr><td>' + newTrain +
        ' </td><td>' + newLocation +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>');


    $("#tname, #tdestination, #ttime, #tfrequency").val("");
    return false;
},

    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



