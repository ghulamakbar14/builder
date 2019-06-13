angular.module("quickquiz-builder").directive("quizbuilderQuestions", ["SettingsService", "$filter", function (a, c) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "templates/questions.html",
        controllerAs: "ctrl",
        controller: ["$scope", function (c) {
            a.get().then(function success(data){
                this.settingsService = {};
                this.configFile = data.configFile;
                this.settingsService.generalSettings = this.configFile.settings;
                this.settingsService.labels = this.configFile.labels;
                this.settingsService.score = this.configFile.score;
                this.settingsService.database = this.configFile.database;
                this.questionsService = data.questions;
                c.settingsService = this.settingsService;
                this.pageSelected = this.questionsService.pages.length - 1, c.addPage = function () {
                    this.questionsService.pages.push({
                        title: "",
                        description: "",
                        questions: [],
                        media: []
                    }), this.pageSelected = this.questionsService.pages.length - 1
                }, c.removePage = function (a) {
                    this.questionsService.pages.splice(a, 1), this.pageSelected > this.questionsService.pages.length - 1 && (this.pageSelected = this.questionsService.pages.length - 1)
                }, c.addMediaSource = "", c.addYoutube = function () {
                    this.questionsService.pages[this.pageSelected].media.length > 0 && (this.questionsService.pages[this.pageSelected].media = []), this.questionsService.pages[this.pageSelected].autoplay = "never"
                }, c.mediaFormat = ["video/mp4", "video/ogg", "video/webm", "audio/mpeg", "audio/ogg", "audio/wav"], c.addMedia = function () {
                    this.questionsService.pages[this.pageSelected].youtube = "", this.questionsService.pages[this.pageSelected].media.push({
                        url: "",
                        type: "video/mp4"
                    }), this.questionsService.pages[this.pageSelected].autoplay = "never"
                }, c.removeMedia = function (a, b) {
                    a.splice(b, 1)
                }, c.questionTypeMenu = ["Multiple choice - Single answer", "Multiple choice - Multiple answer", "Sequence", "Matching pairs", "Short answer", "Long answer", "Likert scale", "Rating", "Matrix - Radio", "Matrix - Rating"], c.questionType = ["single-answer", "multiple-answers", "sequence", "matching-pairs", "short-answer", "long-answer", "likert-scale", "rating", "matrix-radio", "matrix-rating"], this.last = function (a) {
                    return a[a.length - 1]
                }, c.addQuestion = function (a) {
                    var b = {
                        type: this.questionType[a],
                        statement: "",
                        description: "",
                        choicesWeight: [],
                        associatedPersonality: []
                    };
                    if (("matrix-radio" === this.questionType[a] || "matrix-rating" === this.questionType[a]) && (b.type = "matrix"), this.settingsService.generalSettings.graded === !0 && "long-answer" != this.questionType[a] && "likert-scale" != this.questionType[a] && "rating" != this.questionType[a] && "matrix-rating" != this.questionType[a] && (b.graded = !0, b.points = 0, b.penaltyPoints = 0), this.settingsService.generalSettings.weighted === !0 && "sequence" != this.questionType[a] && "matching-pairs" != this.questionType[a] && "short-answer" != this.questionType[a] && "long-answer" != this.questionType[a] && (b.weighted = !0), ("single-answer" === this.questionType[a] || "multiple-answers" === this.questionType[a] || "matching-pairs" === this.questionType[a]) && (b.choicesType = "button"), "sequence" === this.questionType[a] && (b.choicesType = "select"), "matrix-rating" === this.questionType[a] && (b.choicesType = "rating"), "matrix-radio" === this.questionType[a] && (b.choicesType = "radio"), "matching-pairs" === this.questionType[a] && (b.choicesLeft = [], b.choicesRight = [], b.borderColor = !0), ("sequence" === this.questionType[a] || "multiple-answers" === this.questionType[a] || "single-answer" === this.questionType[a] || "matrix-radio" === this.questionType[a]) && (b.choices = []), ("matrix-radio" === this.questionType[a] || "matrix-rating" === this.questionType[a]) && (b.rows = [], b.rID = []), ("single-answer" === this.questionType[a] || "multiple-answers" === this.questionType[a]) && (b.otherOption = !1, b.other = {
                        text: "Other",
                        placeholder: "Write here your answer",
                        position: "right"
                    }), ("matching-pairs" === this.questionType[a] || "sequence" === this.questionType[a] || "multiple-answers" === this.questionType[a] || "short-answer" === this.questionType[a] || "matrix-radio" === this.questionType[a]) && (b.solution = []), "short-answer" === this.questionType[a] || "long-answer" === this.questionType[a] ? b.placeholder = "Write your answer here" : b.placeholder = "Select", "likert-scale" === this.questionType[a]) {
                        b.scaleType = "button", b.minValue = 1, b.maxValue = 10, b.customValues = [];
                        for (var c = b.minValue; c < b.maxValue + 1; c++) b.customValues.push(c)
                    }
                    if ("rating" === this.questionType[a] || "matrix-rating" === this.questionType[a]) {
                        b.icon = "star", b.maxValue = 5, b.customValues = [];
                        for (var c = 1; c < b.maxValue + 1; c++) b.customValues.push(c)
                    }
                    b.feedbackType = "none", b.feedbackClass = "button", b.itemsWidth = 50, b.itemSeparation = !0, b.showSource = !0, b.showAdvancedOptions = !1, this.questionsService.pages[this.pageSelected].questions.push(b)
                }, c.getQuestionsCreated = function () {
                    for (var a = [], b = 0; b < this.questionsService.pages.length; b++)
                        for (var c = 0; c < this.questionsService.pages[b].questions.length; c++) this.questionsService.pages[b].questions[c].pageNum = b, this.questionsService.pages[b].questions[c].questionNum = c, a.push(this.questionsService.pages[b].questions[c]);
                    return a
                }, c.copyQuestion = function (a, b) {
                    this.newQuestion = angular.copy(this.questionsService.pages[a].questions[b]), this.newQuestion.showSource = !0, this.questionsService.pages[this.pageSelected].questions.push(this.newQuestion)
                }, c.deleteQuestion = function (a) {
                    this.questionsService.pages[this.pageSelected].questions.splice(a, 1)
                }, c.onPointsChanged = function (a) {
                    "number" != typeof this.questionsService.pages[this.pageSelected].questions[a].points && (this.questionsService.pages[this.pageSelected].questions[a].points = 0)
                }, c.onPenaltyPointsChanged = function (a) {
                    "number" != typeof this.questionsService.pages[this.pageSelected].questions[a].penaltyPoints && (this.questionsService.pages[this.pageSelected].questions[a].penaltyPoints = 0)
                }, c.onFeedbackChanged = function (a) {
                    "option" === this.questionsService.pages[this.pageSelected].questions[a].feedbackType && (this.questionsService.pages[this.pageSelected].questions[a].feedback.option = [])
                }, c.onChangeAsideImg = function (a) {
                    this.questionsService.pages[this.pageSelected].questions[a].asideImg === !0 && "string" != typeof this.questionsService.pages[this.pageSelected].questions[a].imagePosition && (this.questionsService.pages[this.pageSelected].questions[a].imagePosition = "right")
                }, c.deleteChoice = function (a) {
                    ("single-answer" === this.questionsService.pages[this.pageSelected].questions[a].type || "matrix-radio" === this.questionsService.pages[this.pageSelected].questions[a].type) && delete this.questionsService.pages[this.pageSelected].questions[a].solution, ("matching-pairs" === this.questionsService.pages[this.pageSelected].questions[a].type || "sequence" === this.questionsService.pages[this.pageSelected].questions[a].type || "multiple-answers" === this.questionsService.pages[this.pageSelected].questions[a].type || "short-answer" === this.questionsService.pages[this.pageSelected].questions[a].type) && (this.questionsService.pages[this.pageSelected].questions[a].solution = [])
                }, c.onChangeGradedQuestion = function (a) {
                    !this.questionsService.pages[this.pageSelected].questions[a].graded || "single-answer" !== this.questionsService.pages[this.pageSelected].questions[a].type && "multiple-answers" !== this.questionsService.pages[this.pageSelected].questions[a].type || (this.questionsService.pages[this.pageSelected].questions[a].otherOption = !1)
                }, c.onChangeWeightedQuestion = function (a) {
                    !this.questionsService.pages[this.pageSelected].questions[a].weighted || "single-answer" !== this.questionsService.pages[this.pageSelected].questions[a].type && "multiple-answers" !== this.questionsService.pages[this.pageSelected].questions[a].type || (this.questionsService.pages[this.pageSelected].questions[a].otherOption = !1)
                }, c.onChangeLikertValues = function (a) {
                    this.questionsService.pages[this.pageSelected].questions[a].customValues = [];
                    for (var b = this.questionsService.pages[this.pageSelected].questions[a].minValue; b < this.questionsService.pages[this.pageSelected].questions[a].maxValue + 1; b++) this.questionsService.pages[this.pageSelected].questions[a].customValues.push(b)
                }, c.onChangeRatingValues = function (a) {
                    this.questionsService.pages[this.pageSelected].questions[a].customValues = [];
                    for (var b = 1; b < this.questionsService.pages[this.pageSelected].questions[a].maxValue + 1; b++) this.questionsService.pages[this.pageSelected].questions[a].customValues.push(b)
                }, c.onChangeOtherOption = function (a) {
                    this.questionsService.pages[this.pageSelected].questions[a].otherOption && ("single-answer" === this.questionsService.pages[this.pageSelected].questions[a].type ? this.questionsService.pages[this.pageSelected].questions[a].choicesType = "radio" : "multiple-answers" === this.questionsService.pages[this.pageSelected].questions[a].type && (this.questionsService.pages[this.pageSelected].questions[a].choicesType = "checkbox"))
                }, c.onChangeID = function (a) {
                    for (; this.questionsService.pages[this.pageSelected].questions[a].qID.indexOf(" ") > -1;) this.questionsService.pages[this.pageSelected].questions[a].qID = this.questionsService.pages[this.pageSelected].questions[a].qID.replace(" ", "")
                }, c.onChangeRID = function (a, b) {
                    for (; this.questionsService.pages[this.pageSelected].questions[a].rID[b].indexOf(" ") > -1;) this.questionsService.pages[this.pageSelected].questions[a].rID[b] = this.questionsService.pages[this.pageSelected].questions[a].rID[b].replace(" ", "")
                }
                c.pageSelected = this.pageSelected;
                c.questionsService = this.questionsService;
            });
        }]
    }
}])