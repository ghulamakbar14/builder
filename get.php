<?php

$config = '{
  "settings": {
    "whiteframe": true,
    "titleToolbar": true,
    "showPageNumber": true,
    "showProgressBar": true,
    "showQuestionNumber": true,
    "graded": true,
    "personality": false,
    "showPointsPerQuestion": false,
    "requiredQuestions": false,
    "requiredAsterisk": true,
    "requiredType": "alert",
    "showGlobalAlert": false,
    "showQuestionAlert": true,
    "pageAnimation": "",
    "timerCount": 0,
    "saveLocalStorage": false,
    "showLocalStoragePopUp": false,
    "refreshBrowser": false,
    "autoAdvance": false,
    "hidePageButtons": false,
    "redoButton": false
  },
  "labels": {
    "homeTitle": "QuickQuiz Title",
    "homeDescription": "",
    "startQuiz": "START",
    "mainTitle": "",
    "previousText": "Previous",
    "nextText": "Next",
    "lastText": "Finish",
    "requiredGlobalAlert": "You must answer all the required questions",
    "requiredQuestionAlert": "This question is required",
    "pointsPerQuestionText": "points",
    "showFeedback": "Check answer",
    "feedbackTitle": "",
    "feedbackOK": "OK",
    "closeImage": "Close",
    "scoreTitle": "Score",
    "scoreDescription": "",
    "pointsScored": "Points scored",
    "percentageScored": "Percentage scored",
    "correct": "Correct",
    "incorrect": "Incorrect",
    "leftBlank": "Left Blank",
    "unansweredQuestion": "Unanswered question",
    "answerPrevText": "Your answer",
    "solutionPrevText": "Solution",
    "submitButton": "Submit",
    "sentSuccess": "Thanks, your quiz has been sent!",
    "sentError": "Sorry, there has been an error!",
    "sendTitle": "Send your answers",
    "sendName": "Your name",
    "sendEmail": "Your email",
    "requiredField": "Required field",
    "emailError": "Email is not valid",
    "thanksTitle": "Thanks!",
    "thanksDescription": "",
    "showMessagePoints": [
      {
        "greaterThan": "",
        "message": ""
      }
    ],
    "loadLocalStorageAlert": "Do you want to load your previous answers?",
    "fromSavedButton": "Yes",
    "fromScratchButton": "No, start from scratch",
    "redoText": "Start again"
  },
  "score": {
    "maxPoints": 0,
    "scoreByQuestion": true,
    "penaltyPointsPerQuestion": 0,
    "decimalNumber": 0,
    "showMessage": true,
    "showPoints": true,
    "showMaxPoints": true,
    "showPointsMessage": true,
    "showPercentage": false,
    "showPercentageMessage": false,
    "showPersonalityMessage": false,
    "showSummary": false,
    "showQuiz": true,
    "showUserAnswers": true,
    "showIcons": true,
    "showSolution": true,
    "scoreMessageBGColor": "#80CBC4",
    "scoreMessageTextColor": "#333333"
  }
}';

$question = '{
    "pages": [
      {}
    ]
  }';
  echo json_encode(array('config' => $config));
//echo json_encode(array('config' => $config, 'question' => $question));
?>