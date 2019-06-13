angular.module("quickquiz-builder").directive("quizbuilderSettings", ["SettingsService", "$filter", function (a, c) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "templates/settings.html",
        controllerAs: "ctrl",
        bindToController: true,
        bindings: {
            callback: '&'
        },
        controller: ["$scope", function (c) {
            a.get().then(function (data){
                this.settingsService = {};
                this.configFile = data.configFile;
                this.settingsService.generalSettings = this.configFile.settings;
                this.settingsService.labels = this.configFile.labels;
                this.settingsService.score = this.configFile.score;
                this.settingsService.database = this.configFile.database;
                c.settingsService = this.settingsService;
                this.questionsService = c.questionsService = data.questions;
                c.onChangeTimer = function () {
                    "number" != typeof this.settingsService.generalSettings.timerCount && (this.settingsService.generalSettings.timerCount = 0)
                }, c.onChangeGraded = function () {
                    surveyQuiz();
                    this.settingsService.generalSettings.graded = c.settingsService.generalSettings.graded = !0;
                    this.settingsService.generalSettings.weighted = c.settingsService.generalSettings.weighted = !1; 
                    this.settingsService.generalSettings.personality = c.settingsService.generalSettings.personality = !1; 
                    this.settingsService.generalSettings.survey = c.settingsService.generalSettings.survey = !1; 
                    this.settingsService.generalSettings.showPointsPerQuestion = c.settingsService.generalSettings.showPointsPerQuestion = !1; 
                    this.settingsService.score.scoreByQuestion = c.settingsService.score.scoreByQuestion = !0; 
                    this.settingsService.score.showPoints = c.settingsService.score.showPoints = !0; 
                    this.settingsService.score.showMaxPoints = c.settingsService.score.showMaxPoints = !0; 
                    this.settingsService.score.showPointsMessage = c.settingsService.score.showPointsMessage = !0; 
                    this.settingsService.score.showMessage = c.settingsService.score.showMessage = !0; 
                    this.settingsService.score.showQuiz = c.settingsService.score.showQuiz = !0; 
                    this.settingsService.score.showUserAnswers = c.settingsService.score.showUserAnswers = !0; 
                    this.settingsService.score.showIcons = c.settingsService.score.showIcons = !0;
                    this.settingsService.score.showSolution = c.settingsService.score.showSolution = !0; 
                    this.settingsService.score.customImagesBy = c.settingsService.score.customImagesBy = "points"; 
                    this.settingsService.score.share.shareBy = c.settingsService.score.share.shareBy = "points"; 
                    "none" != this.database && (this.settingsService.database.sendPoints = c.settingsService.database.sendPoints = !0, 
                        this.settingsService.database.sendPercentage = c.settingsService.database.sendPercentage = !0, 
                        this.settingsService.database.sendAnswers = c.settingsService.database.sendAnswers = !0, 
                        this.settingsService.database.sendWinningPersonality = c.settingsService.database.sendWinningPersonality = !1, 
                        this.settingsService.database.sendFrequency = c.settingsService.database.sendFrequency = !1);
                    for (var a = 0; a < this.questionsService.pages.length; a++)
                        for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) this.questionsService.pages[a].questions[b].choicesWeight = [], this.questionsService.pages[a].questions[b].associatedPersonality = [], this.questionsService.pages[a].questions[b].weighted === !0 && delete this.questionsService.pages[a].questions[b].weighted, "long-answer" != this.questionsService.pages[a].questions[b].type && "likert-scale" != this.questionsService.pages[a].questions[b].type && "rating" != this.questionsService.pages[a].questions[b].type && "rating" != this.questionsService.pages[a].questions[b].choicesType && (this.questionsService.pages[a].questions[b].graded = !0), ("single-answer" === this.questionsService.pages[a].questions[b].type || "multiple-answers" === this.questionsService.pages[a].questions[b].type) && (this.questionsService.pages[a].questions[b].otherOption = !1)
                }, c.onChangeWeighted = function () {
                    surveyQuiz();
                    this.settingsService.generalSettings.graded = c.settingsService.generalSettings.graded = !1; 
                    this.settingsService.generalSettings.weighted = c.settingsService.generalSettings.weighted = !0; 
                    this.settingsService.generalSettings.personality = c.settingsService.generalSettings.personality = !1; 
                    this.settingsService.generalSettings.survey = c.settingsService.generalSettings.survey = !1; 
                    this.settingsService.generalSettings.showPointsPerQuestion = c.settingsService.generalSettings.showPointsPerQuestion = !1; 
                    this.settingsService.score.maxPoints = c.settingsService.score.maxPoints = 0; 
                    this.settingsService.score.scoreByQuestion = c.settingsService.score.scoreByQuestion = !1; 
                    this.settingsService.score.penaltyPointsPerQuestion = c.settingsService.score.penaltyPointsPerQuestion = 0; 
                    this.settingsService.score.decimalNumber = c.settingsService.score.decimalNumber = 0; 
                    this.settingsService.score.showPoints = c.settingsService.score.showPoints = !0; 
                    this.settingsService.score.showMaxPoints = c.settingsService.score.showMaxPoints = !1; 
                    this.settingsService.score.showPointsMessage = !0; 
                    this.settingsService.score.showPercentage = !1; 
                    this.settingsService.score.showPercentageMessage = !1; 
                    this.settingsService.score.showSummary = !1; 
                    this.settingsService.score.showMessage = !0; 
                    this.settingsService.score.showIcons = !1; 
                    this.settingsService.score.showSolution = !1; 
                    this.settingsService.database.sendPoints = !1; 
                    this.settingsService.database.sendPercentage = !1; 
                    this.settingsService.database.sendAnswers = !1; 
                    this.settingsService.database.sendWinningPersonality = !1; 
                    this.settingsService.database.sendFrequency = !1; 
                    this.settingsService.score.showQuiz = !0; 
                    this.settingsService.score.showUserAnswers = !0; 
                    this.settingsService.score.showIcons = !1; 
                    this.settingsService.score.showSolution = !1; 
                    this.settingsService.score.customImagesBy = "points"; 
                    this.settingsService.score.share.shareBy = "points"; 
                    "none" != this.database && (this.settingsService.database.sendPoints = !0, 
                        this.settingsService.database.sendPercentage = !1,
                        this.settingsService.database.sendAnswers = !0, 
                        this.settingsService.database.sendWinningPersonality = !1, 
                        this.settingsService.database.sendFrequency = !1);
                        this.questionsService = c.questionsService;
                    for (var a = 0; a < this.questionsService.pages.length; a++)
                        for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) "sequence" != this.questionsService.pages[a].questions[b].type && "matching-pairs" != this.questionsService.pages[a].questions[b].type && "short-answer" != this.questionsService.pages[a].questions[b].type && "long-answer" != this.questionsService.pages[a].questions[b].type && (this.questionsService.pages[a].questions[b].weighted = !0), this.questionsService.pages[a].questions[b].associatedPersonality = [], this.questionsService.pages[a].questions[b].graded === !0 && delete this.questionsService.pages[a].questions[b].graded, ("single-answer" === this.questionsService.pages[a].questions[b].type || "multiple-answers" === this.questionsService.pages[a].questions[b].type) && (this.questionsService.pages[a].questions[b].otherOption = !1)
                }, c.onChangePersonality = function () {
                    surveyQuiz(), 
                    this.settingsService.generalSettings.graded = c.settingsService.generalSettings.graded = !1; 
                    this.settingsService.generalSettings.weighted = c.settingsService.generalSettings.weighted = !1; 
                    console.log(this.settingsService.generalSettings.graded, c.settingsService.generalSettings.graded);
                    this.settingsService.generalSettings.personality = c.settingsService.generalSettings.personality = !0; 
                    this.settingsService.generalSettings.survey = c.settingsService.generalSettings.survey = !1; 
                    this.settingsService.generalSettings.showPointsPerQuestion = c.settingsService.generalSettings.showPointsPerQuestion = !1; 
                    this.settingsService.score.maxPoints = c.settingsService.score.maxPoints = 0; 
                    this.settingsService.score.scoreByQuestion = c.settingsService.score.scoreByQuestion = !1; 
                    this.settingsService.score.penaltyPointsPerQuestion = c.settingsService.score.penaltyPointsPerQuestion = 0; 
                    this.settingsService.score.decimalNumber = c.settingsService.score.decimalNumber = 0; 
                    this.settingsService.score.showPoints = c.settingsService.score.showPoints = !1; 
                    this.settingsService.score.showMaxPoints = c.settingsService.score.showMaxPoints = !1; 
                    this.settingsService.score.showPointsMessage = c.settingsService.score.showPointsMessage = !1; 
                    this.settingsService.score.showPercentage = c.settingsService.score.showPercentage = !1; 
                    this.settingsService.score.showPercentageMessage = c.settingsService.score.showPercentageMessage = !1; 
                    this.settingsService.score.showPersonalityMessage = c.settingsService.score.showPersonalityMessage = !0; 
                    this.settingsService.score.showSummary = c.settingsService.score.showSummary = !1; 
                    this.settingsService.score.showMessage = c.settingsService.score.showMessage = !0; 
                    this.settingsService.score.showIcons = c.settingsService.score.showIcons = !1; 
                    this.settingsService.score.showSolution = c.settingsService.score.showSolution = !1; 
                    this.settingsService.database.sendPoints = c.settingsService.database.sendPoints = !1; 
                    this.settingsService.database.sendPercentage = c.settingsService.database.sendPercentage = !1; 
                    this.settingsService.database.sendAnswers = c.settingsService.database.sendAnswers = !1; 
                    this.settingsService.database.sendWinningPersonality = c.settingsService.database.sendWinningPersonality = !1; 
                    this.settingsService.database.sendFrequency = c.settingsService.database.sendFrequency = !1; 
                    this.settingsService.score.showQuiz = c.settingsService.score.showQuiz = !1;
                    this.settingsService.score.showUserAnswers = c.settingsService.score.showUserAnswers = !1; 
                    this.settingsService.score.showIcons = c.settingsService.score.showIcons = !1; 
                    this.settingsService.score.showSolution = c.settingsService.score.showSolution = !1; 
                    this.settingsService.score.customImagesBy = c.settingsService.score.customImagesBy = "personality"; 
                    this.settingsService.score.share.shareBy = c.settingsService.score.share.shareBy = "personality"; 
                    "none" != this.database && (this.settingsService.database.sendPoints = c.settingsService.database.sendPoints = !0, 
                        this.settingsService.database.sendPercentage = c.settingsService.database.sendPercentage = !1, 
                        this.settingsService.database.sendAnswers = c.settingsService.database.sendAnswers = !1, 
                        this.settingsService.database.sendWinningPersonality = c.settingsService.database.sendWinningPersonality = !0, 
                        this.settingsService.database.sendFrequency = c.settingsService.database.sendFrequency = !1);
                    this.questionsService = c.questionsService;
                    for (var a = 0; a < this.questionsService.pages.length; a++)
                        for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) this.questionsService.pages[a].questions[b].choicesWeight = [], this.questionsService.pages[a].questions[b].graded === !0 && delete this.questionsService.pages[a].questions[b].graded, this.questionsService.pages[a].questions[b].weighted === !0 && delete this.questionsService.pages[a].questions[b].weighted, ("single-answer" === this.questionsService.pages[a].questions[b].type || "multiple-answers" === this.questionsService.pages[a].questions[b].type) && (this.questionsService.pages[a].questions[b].otherOption = !1)
                }, c.onChangeSurvey = function () {
                    this.settingsService.generalSettings.survey && surveyQuiz();
                    // this.configFile = {
                    //     settings: this.generalSettings,
                    //     labels: this.labels,
                    //     score: this.score,
                    //     database: this.database
                    // };
                    // c.configFile = this.configFile;
                }, surveyQuiz = function () {
                    this.settingsService.generalSettings.graded = c.settingsService.generalSettings.graded = !1;
                    this.settingsService.generalSettings.weighted = c.settingsService.generalSettings.weighted = !1;
                    this.settingsService.generalSettings.personality = c.settingsService.generalSettings.personality = !1;
                    this.settingsService.generalSettings.showPointsPerQuestion = c.settingsService.generalSettings.showPointsPerQuestion = !1;
                    this.settingsService.score.maxPoints = c.settingsService.score.maxPoints = 0; 
                    this.settingsService.score.scoreByQuestion = c.settingsService.score.scoreByQuestion = !1; 
                    this.settingsService.score.penaltyPointsPerQuestion = c.settingsService.score.penaltyPointsPerQuestion = 0; 
                    this.settingsService.score.decimalNumber = c.settingsService.score.decimalNumber = 0; 
                    this.settingsService.score.showPoints = c.settingsService.score.showPoints = !1; 
                    this.settingsService.score.showMaxPoints = c.settingsService.score.showMaxPoints = !1; 
                    this.settingsService.score.showPointsMessage = c.settingsService.score.showPointsMessage = !1; 
                    this.settingsService.score.showPercentage = c.settingsService.score.showPercentage = !1; 
                    this.settingsService.score.showPercentageMessage = c.settingsService.score.showPercentageMessage = !1; 
                    this.settingsService.score.showPersonalityMessage = c.settingsService.score.showPersonalityMessage = !1; 
                    this.settingsService.score.showSummary = c.settingsService.score.showSummary = !1; 
                    this.settingsService.score.showMessage = c.settingsService.score.showMessage = !1; 
                    this.settingsService.score.showIcons = c.settingsService.score.showIcons = !1; 
                    this.settingsService.score.showSolution = c.settingsService.score.showSolution = !1; 
                    this.settingsService.database.sendPoints = c.settingsService.database.sendPoints = !1; 
                    this.settingsService.database.sendPercentage = c.settingsService.database.sendPercentage = !1; 
                    this.settingsService.database.sendAnswers = c.settingsService.database.sendAnswers = !1; 
                    this.settingsService.database.sendWinningPersonality = c.settingsService.database.sendWinningPersonality = !1; 
                    this.settingsService.database.sendFrequency = c.settingsService.database.sendFrequency = !1; 
                    this.settingsService.score.showQuiz = c.settingsService.score.showQuiz = !0; 
                    this.settingsService.score.showUserAnswers = c.settingsService.score.showUserAnswers = !0; 
                    this.settingsService.score.showIcons = c.settingsService.score.showIcons = !1; 
                    this.settingsService.score.showSolution = c.settingsService.score.showSolution = !1; 
                    this.settingsService.score.showCustomImage = c.settingsService.score.showCustomImage = !1; 
                    "none" != this.database && (this.settingsService.database.sendPoints = c.settingsService.database.sendPoints = !1, 
                        this.settingsService.database.sendPercentage = c.settingsService.database.sendPercentage = !1, 
                        this.settingsService.database.sendAnswers = c.settingsService.database.sendAnswers = !0, 
                        this.settingsService.database.sendWinningPersonality = c.settingsService.database.sendWinningPersonality = !1, 
                        this.settingsService.database.sendFrequency = c.settingsService.database.sendFrequency = !1);
                    for (var a = 0; a < this.questionsService.pages.length; a++)
                        for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) this.questionsService.pages[a].questions[b].choicesWeight = [], this.questionsService.pages[a].questions[b].associatedPersonality = [], this.questionsService.pages[a].questions[b].graded === !0 && delete this.questionsService.pages[a].questions[b].graded, this.questionsService.pages[a].questions[b].weighted === !0 && delete this.questionsService.pages[a].questions[b].weighted;
                }, c.onChangeLocalStorage = function () {
                    this.settingsService.generalSettings.saveLocalStorage || (this.settingsService.generalSettings.showLocalStoragePopUp = !1, 
                        this.settingsService.generalSettings.refreshBrowser = !1)
                }, c.onChangeShowLocalStoragePopUp = function () {
                    this.settingsService.generalSettings.showLocalStoragePopUp && (this.settingsService.generalSettings.refreshBrowser = !1)
                }, c.onChangeRefreshBrowser = function () {
                    this.settingsService.generalSettings.refreshBrowser && (this.settingsService.generalSettings.showLocalStoragePopUp = !1)
                }, c.onChangeAutoAdvance = function () {
                    this.settingsService.generalSettings.autoAdvance || (this.settingsService.generalSettings.hidePageButtons = !1)
                }, this.settingsAnimation = {}, this.settingsAnimation.fade = !1, this.settingsAnimation.slide = !1, this.settingsAnimationFunc = function () {
                    this.settingsService.generalSettings.pageAnimation = "",
                    this.settingsAnimation.fade && (this.settingsService.generalSettings.pageAnimation += "fade"),
                    this.settingsAnimation.slide && (this.settingsService.generalSettings.pageAnimation += " slide")
                }, c.removeBreakpoint = function (a, b) {
                    a.splice(b, 1)
                }, c.addBreakpoint = function (a) {
                    a.push({
                        greaterThan: "",
                        message: ""
                    })
                }, c.addBreakpointImage = function (a) {
                    a.push({
                        personality: "",
                        greaterThan: "",
                        img: ""
                    })
                }, c.addBreakpointShare = function (a) {
                    a.push({
                        personality: "",
                        greaterThan: "",
                        url: ""
                    })
                }, c.addBreakpointPersonality = function (a) {
                    a.push({
                        personality: "",
                        message: ""
                    })
                }, c.onChangeShowMessage = function () {
                    this.settingsService.score.showMessage || (this.settingsService.score.showPoints = !1, 
                        this.settingsService.score.showMaxPoints = !1, 
                        this.settingsService.score.showPointsMessage = !1, 
                        this.settingsService.score.showPercentage = !1, 
                        this.settingsService.score.showPercentageMessage = !1, 
                        this.settingsService.score.showSummary = !1)
                }, c.onChangeMaxPoints = function () {
                    if ("number" != typeof this.settingsService.score.maxPoints && (this.settingsService.score.maxPoints = 0), 
                    this.settingsService.score.maxPoints > 0) {
                        this.settingsService.score.scoreByQuestion = !1;
                        for (var a = 0; a < this.questionsService.pages.length; a++)
                            for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) delete this.questionsService.pages[a].questions[b].points
                    } else {
                        this.settingsService.score.scoreByQuestion = !0;
                        for (var a = 0; a < this.questionsService.pages.length; a++)
                            for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) this.questionsService.pages[a].questions[b].points = 0
                    }
                }, c.onChangePenaltyPointsPerQuestion = function () {
                    if ("number" != typeof this.settingsService.score.penaltyPointsPerQuestion && (this.settingsService.score.penaltyPointsPerQuestion = 0), 
                    this.settingsService.score.penaltyPointsPerQuestion > 0)
                        for (var a = 0; a < this.questionsService.pages.length; a++)
                            for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) delete this.questionsService.pages[a].questions[b].penaltyPoints;
                    else
                        for (var a = 0; a < this.questionsService.pages.length; a++)
                            for (var b = 0; b < this.questionsService.pages[a].questions.length; b++) this.questionsService.pages[a].questions[b].penaltyPoints = 0
                }, c.onChangeDecimalNumber = function () {
                    "number" != typeof this.settingsService.score.decimalNumber && (this.settingsService.score.decimalNumber = 0)
                }, c.onChangeShowPoints = function () {
                    this.settingsService.score.showPoints || (this.settingsService.score.showMaxPoints = !1)
                }, c.onChangeShowQuiz = function () {
                    this.settingsService.score.showQuiz ? (this.settingsService.score.showUserAnswers = !0, 
                        this.settingsService.generalSettings.graded && (this.settingsService.score.showIcons = !0, 
                            this.settingsService.score.showSolution = !0)) : (this.settingsService.score.showUserAnswers = !1, 
                                this.settingsService.score.showIcons = !1, 
                                this.settingsService.score.showSolution = !1)
                }, c.onChangeShowUserAnswers = function () {
                    this.settingsService.score.showUserAnswers ? this.settingsService.generalSettings.graded && (this.settingsService.score.showIcons = !0) : this.settingsService.score.showIcons = !1
                }, this.database = "none", c.onChangeDatabase = function () {
                    this.settingsService.database.selected = this.database, this.database && "none" !== this.database ? (this.settingsService.generalSettings.graded && (this.settingsService.database.sendPercentage = !0, this.settingsService.database.sendPoints = !0), this.settingsService.generalSettings.personality && (this.settingsService.database.sendWinningPersonality = !0, this.settingsService.database.sendFrequency = !1), "mysql" === this.database && (this.settingsService.database.mySQL = !0, this.settingsService.database.applicationId = "", this.settingsService.database.javascriptKey = ""), "parse" === this.database && (this.settingsService.database.mySQL = !1), this.settingsService.generalSettings.personality || (this.settingsService.database.sendAnswers = !0), this.settingsService.database.showSuccess = !0, this.settingsService.database.goTo = "", this.settingsService.database.goToUrl = "http://", this.sendFrom = "score", this.settingsService.database.sendFrom = "score", this.settingsService.showForm2 = "score", this.settingsService.database.name = !1, this.settingsService.database.email = !1) : (this.settingsService.database.mySQL = !1, this.settingsService.database.applicationId = "", this.settingsService.database.javascriptKey = "", this.settingsService.database.sendPercentage = !1, this.settingsService.database.sendPoints = !1, this.settingsService.database.sendAnswers = !1, this.settingsService.database.sendWinningPersonality = !1, this.settingsService.database.sendFrequency = !1, this.settingsService.database.showSuccess = !1, this.settingsService.database.goTo = "", this.settingsService.database.goToUrl = "", this.sendFrom = "", this.settingsService.database.sendFrom = "", this.settingsService.showForm2 = "", this.settingsService.database.name = !1, this.settingsService.database.email = !1)
                }
                c.settingsAnimation = this.settingsAnimation;
                c.database = this.database;
                c.settingsService = this.settingsService;
            }).catch(function(e){
                console.dir(e);
            });
        }]
    }
}])
