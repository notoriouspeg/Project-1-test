let userOneScore = 0;
let userNames = [];
let possibleAnswers = [];
let correctAnswers = [];
let wrongAnswers = [];

// function to add new users name/score
function listUsers() {
$("#playerNames").empty();
    userNames.forEach(user => {
        
        let newPlayer = $("<p>");
        newPlayer.append(`${user.name}'s score: ${user.score}`);
        $("#playerNames").append(newPlayer);
    })
}

$(document).ready(function () {

    // function to add the player names to an array for all users and display the names onto the HTML
    $("#nameEnter").click(function (event) {
        event.preventDefault();
        let newUser = { name: "", score: 0 }
        let addedName = $("#nameSet").val();
        $("#nameSet").val("");
        newUser.name = addedName;
        userNames.push(newUser);
        console.log(userNames);
        listUsers();

    })

    // function to get 5 trivia questions based on difficulty
    $(document).on("click", ".btn", function () {
        event.preventDefault();
        let difficulty = $(this).attr("difficulty")
        let amount = $(this).attr("amount")
        let queryURL = "https://opentdb.com/api.php?" + amount + "&" + difficulty + "&type=multiple";

        $.ajax({
            url: queryURL,
            method: "GET",
        })
            .then(function (response) {
                console.log(response)

                let results = response.results;
                for (var i = 0; i < results.length; i++) {

                    let question = results[i].question;
                    let questionP = $("<p>");
                    questionP.attr("id", "question");
                    questionP.text(question);
                    $("#questionText").append(questionP);

                    let correctAnswer = results[i].correct_answer;
                    let correctP = $("<p>");
                    correctP.text("A. " + correctAnswer);
                    correctP.attr("id", "correct");
                    $("#answerText").append(correctP);

                    let wrongAnswer = results[i].incorrect_answers;
                    let wrongP = $("<p>");
                    wrongP.text("B. " + results[i].incorrect_answers[0] + " " + "C. " + results[i].incorrect_answers[1] + " " + "D. " + results[i].incorrect_answers[2]);
                    wrongP.attr("id", "wrong");
                    $("#answerText").append(wrongP);

                    $("#nextQuestion").click(function(event){
                    event.preventDefault();

                    }) // end of click function
                } // end of for loop
            }) // end of then function
    }) // end of ajax

});


//for questions we can; 
// create an array of all possible answers
// add the correct answers to an array, add the wrong answers to an array
// create buttons for each answer and randomize
// create a submit button that checks your answers at the end and totals your points and displays it to the HTML

