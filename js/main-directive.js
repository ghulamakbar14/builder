angular.module("quickquiz-builder").directive("quizbuilderMain", ["SettingsService", "$filter", "$localStorage", "$timeout", "$http", function (a, c, d, e,http) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "templates/main.html",
        controllerAs: "ctrl",
        controller: ["$scope", function (f) {
            a.get().then(function (data){
                this.settingsService = {};
                this.configFile = data.configFile;
                f.configJSON = this.configJSON = data.configFile;
                this.settingsService.generalSettings = this.configFile.settings;
                f.settingsService = this.settingsService;
                this.settingsService.labels = this.configFile.labels;
                this.settingsService.score = this.configFile.score;
                this.settingsService.database = this.configFile.database;
                this.settingsService.configFile = this.configFile;
                this.questionsService = data.questions;
                this.iframeLocation = "../yourQuiz/preview.html", this.isEmpty = function (a) {
                    for (var b in a)
                        if (a.hasOwnProperty(b)) return !1;
                    return !0
                }, f.parseHtml = function (a) {
                    var b = /<[a-z][\s\S]*>/i.test(a),
                        c = a.replace(/\n/g, "<br>");
                    return b && (c = a), c
                }, this.configJSON = {}, f.createConfigJSON = function () {
                    if (this.configJSON = angular.copy(f.settingsService.configFile), this.configJSON.settings.personality && 0 !== this.configJSON.settings.personalities.length || delete this.configJSON.settings.personalities, "" != this.configJSON.labels.homeDescription && (this.configJSON.labels.homeDescription = f.parseHtml(this.configJSON.labels.homeDescription)), "" != this.configJSON.labels.scoreDescription && (this.configJSON.labels.scoreDescription = f.parseHtml(this.configJSON.labels.scoreDescription)), "" != this.configJSON.labels.thanksDescription && (this.configJSON.labels.thanksDescription = f.parseHtml(this.configJSON.labels.thanksDescription)), this.configJSON.score.showPointsMessage === !1) delete this.configJSON.labels.showMessagePoints;
                    else
                        for (var a = 0; a < this.configJSON.labels.showMessagePoints.length; a++) this.configJSON.labels.showMessagePoints[a].message = f.parseHtml(this.configJSON.labels.showMessagePoints[a].message);
                    if (this.configJSON.score.showPercentageMessage === !1) delete this.configJSON.labels.showMessagePercentage;
                    else
                        for (var a = 0; a < this.configJSON.labels.showMessagePercentage.length; a++) this.configJSON.labels.showMessagePercentage[a].message = f.parseHtml(this.configJSON.labels.showMessagePercentage[a].message);
                    if (this.configJSON.score.showPersonalityMessage === !1) delete this.configJSON.labels.showMessagePersonality;
                    else
                        for (var a = 0; a < this.configJSON.labels.showMessagePersonality.length; a++) this.configJSON.labels.showMessagePersonality[a].message = f.parseHtml(this.configJSON.labels.showMessagePersonality[a].message);
                    if (this.configJSON.database.name === !0 || this.configJSON.database.email === !0 ? this.configJSON.database.showForm = this.settingsService.showForm2 : this.configJSON.database.showForm = "", this.configJSON.score.showCustomImage || (delete this.configJSON.score.showCustomImage, delete this.configJSON.score.customImagesBy, delete this.configJSON.score.customImagesURL), this.configJSON.score.customImagesURL)
                        if (this.configJSON.settings.personality)
                            for (var a = 0; a < this.configJSON.score.customImagesURL.length; a++) delete this.configJSON.score.customImagesURL[a].greaterThan;
                        else
                            for (var a = 0; a < this.configJSON.score.customImagesURL.length; a++) delete this.configJSON.score.customImagesURL[a].personality;
                    if (this.configJSON.score.share.twitter || this.configJSON.score.share.gplus || this.configJSON.score.share.facebook || this.configJSON.score.share.linkedin || delete this.configJSON.score.share, this.configJSON.score.share)
                        if (this.configJSON.settings.personality)
                            for (var a = 0; a < this.configJSON.score.share.customShareURL.length; a++) delete this.configJSON.score.share.customShareURL[a].greaterThan;
                        else
                            for (var a = 0; a < this.configJSON.score.share.customShareURL.length; a++) delete this.configJSON.score.share.customShareURL[a].personality;
                    this.configJSON.settings.weighted === !1 && delete this.configJSON.settings.weighted, this.configJSON.settings.graded === !1 && delete this.configJSON.settings.graded, delete this.configJSON.settings.survey, "parse" === this.configJSON.database.selected ? (delete this.configJSON.database.mySQL, delete this.configJSON.database.selected) : "mysql" === this.configJSON.database.selected ? (delete this.configJSON.database.applicationId, delete this.configJSON.database.javascriptKey, delete this.configJSON.database.selected) : "none" === this.configJSON.database.selected && delete this.configJSON.database;
                    f.configJSON = this.configJSON;
                    console.log(f.configJSON, this.configJSON);
                }, this.questionsJSON = [], this.createQuestionsJSON = function () {
                    this.pages = angular.copy(this.questionsService.pages);
                    for (var a = 0; a < this.pages.length; a++)
                        if ("" === this.pages[a].title && delete this.pages[a].title, "" === this.pages[a].description ? delete this.pages[a].description : "string" == typeof this.pages[a].description && (this.pages[a].description = f.parseHtml(this.pages[a].description)), 0 === this.pages[a].media.length && delete this.pages[a].media, "" === this.pages[a].youtube && delete this.pages[a].youtube, this.pages[a].media || this.pages[a].youtube || delete this.pages[a].autoplay, 0 === this.pages[a].questions.length) delete this.pages[a].questions;
                        else
                            for (var b = 0; b < this.pages[a].questions.length; b++) {
                                if (delete this.pages[a].questions[b].showSource, delete this.pages[a].questions[b].showAdvancedOptions, delete this.pages[a].questions[b].pageNum, delete this.pages[a].questions[b].questionNum, ("number" != typeof this.pages[a].questions[b].cuePoint || !this.pages[a].youtube && !this.pages[a].media) && delete this.pages[a].questions[b].cuePoint, "" === this.pages[a].questions[b].description ? delete this.pages[a].questions[b].description : "string" == typeof this.pages[a].questions[b].description && (this.pages[a].questions[b].description = f.parseHtml(this.pages[a].questions[b].description)), "" === this.pages[a].questions[b].qID && delete this.pages[a].questions[b].qID, this.pages[a].questions[b].hasOwnProperty("rID") && 0 === this.pages[a].questions[b].rID.length && delete this.pages[a].questions[b].rID, "" === this.pages[a].questions[b].header && delete this.pages[a].questions[b].header, this.pages[a].questions[b].graded === !1 && delete this.pages[a].questions[b].graded, this.pages[a].questions[b].weighted === !1 && delete this.pages[a].questions[b].weighted, this.pages[a].questions[b].hasOwnProperty("choicesWeight") && (0 !== this.pages[a].questions[b].choicesWeight.length && this.pages[a].questions[b].weighted || delete this.pages[a].questions[b].choicesWeight), this.pages[a].questions[b].hasOwnProperty("choicesWeight") && "matrix" === this.pages[a].questions[b].type) {
                                    for (var c = 0; c < this.pages[a].questions[b].choicesWeight.length; c++) {
                                        var d = [],
                                            e = 0;
                                        for (var f in this.pages[a].questions[b].choicesWeight[c]) d[e] = this.pages[a].questions[b].choicesWeight[c][f], e++
                                    }
                                    this.pages[a].questions[b].choicesWeight[c + 1] = d, this.pages[a].questions[b].choicesWeight.length = c
                                }
                                if (this.pages[a].questions[b].hasOwnProperty("associatedPersonality") && (0 !== this.pages[a].questions[b].associatedPersonality.length && this.configJSON.settings.personality || delete this.pages[a].questions[b].associatedPersonality), this.pages[a].questions[b].hasOwnProperty("associatedPersonality")) {
                                    for (var d = [], e = 0, c = 0; c < this.pages[a].questions[b].choices.length; c++) {
                                        d[e] = [];
                                        var g = 0;
                                        for (var f in this.pages[a].questions[b].associatedPersonality[c]) d[e][g] = {}, d[e][g].personality = this.configJSON.settings.personalities[f], d[e][g].points = this.pages[a].questions[b].associatedPersonality[c][f], g++;
                                        e++
                                    }
                                    this.pages[a].questions[b].associatedPersonality = d
                                }
                                if (this.pages[a].questions[b].hasOwnProperty("customWeightedValues") && delete this.pages[a].questions[b].customWeightedValues, this.pages[a].questions[b].hasOwnProperty("customValues") && delete this.pages[a].questions[b].customValues, this.pages[a].questions[b].otherOption === !1 && delete this.pages[a].questions[b].other, delete this.pages[a].questions[b].otherOption, this.pages[a].questions[b].images === !1 && delete this.pages[a].questions[b].images, this.pages[a].questions[b].imagesLeft === !1 && delete this.pages[a].questions[b].imagesLeft, this.pages[a].questions[b].imagesRight === !1 && delete this.pages[a].questions[b].imagesRight, 0 === this.pages[a].questions[b].points && delete this.pages[a].questions[b].points, 0 === this.pages[a].questions[b].penaltyPoints && delete this.pages[a].questions[b].penaltyPoints, "" === this.pages[a].questions[b].placeholder && delete this.pages[a].questions[b].placeholder, "short-answer" != this.pages[a].questions[b].type && "long-answer" != this.pages[a].questions[b].type && "select" != this.pages[a].questions[b].choicesType && delete this.pages[a].questions[b].placeholder, "matrix" === this.pages[a].questions[b].type && "radio" === this.pages[a].questions[b].choicesType && (0 !== this.pages[a].questions[b].solution.length && this.pages[a].questions[b].graded || delete this.pages[a].questions[b].solution), (this.pages[a].questions[b].required === !1 || this.settingsService.generalSettings.requiredQuestions === !0) && delete this.pages[a].questions[b].required, this.pages[a].questions[b].random === !1 && delete this.pages[a].questions[b].random, this.pages[a].questions[b].halfWidth === !1 && delete this.pages[a].questions[b].halfWidth, "object" == typeof this.pages[a].questions[b].feedback && ("string" == typeof this.pages[a].questions[b].feedback.basic && ("" === this.pages[a].questions[b].feedback.basic || "basic" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedback.basic, "string" == typeof this.pages[a].questions[b].feedback.right && ("" === this.pages[a].questions[b].feedback.right || "right-wrong" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedback.right, "string" == typeof this.pages[a].questions[b].feedback.wrong && ("" === this.pages[a].questions[b].feedback.wrong || "right-wrong" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedback.wrong, "object" == typeof this.pages[a].questions[b].feedback.partial && ("string" == typeof this.pages[a].questions[b].feedback.partial.allRight && "" === this.pages[a].questions[b].feedback.partial.allRight && delete this.pages[a].questions[b].feedback.partial.allRight, "string" == typeof this.pages[a].questions[b].feedback.partial.someRight && "" === this.pages[a].questions[b].feedback.partial.someRight && delete this.pages[a].questions[b].feedback.partial.someRight, "string" == typeof this.pages[a].questions[b].feedback.partial.wrongRight && "" === this.pages[a].questions[b].feedback.partial.wrongRight && delete this.pages[a].questions[b].feedback.partial.wrongRight, "string" == typeof this.pages[a].questions[b].feedback.partial.allWrong && "" === this.pages[a].questions[b].feedback.partial.allWrong && delete this.pages[a].questions[b].feedback.partial.allWrong, (this.isEmpty(this.pages[a].questions[b].feedback.partial) || "partial" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedback.partial), "object" == typeof this.pages[a].questions[b].feedback.option)) {
                                    if (this.pages[a].questions[b].feedback.option.length > 0)
                                        for (var h = this.pages[a].questions[b].feedback.option.length - 1; h >= 0; h--) "" === this.pages[a].questions[b].feedback.option[h] && delete this.pages[a].questions[b].feedback.option[h];
                                    (0 === this.pages[a].questions[b].feedback.option.length || "option" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedback.option
                                }
                                if ("object" == typeof this.pages[a].questions[b].feedback && this.isEmpty(this.pages[a].questions[b].feedback) && delete this.pages[a].questions[b].feedback, "object" != typeof this.pages[a].questions[b].feedback && delete this.pages[a].questions[b].feedbackClass, "object" == typeof this.pages[a].questions[b].feedbackScore && ("string" == typeof this.pages[a].questions[b].feedbackScore.basic && ("" === this.pages[a].questions[b].feedbackScore.basic || "score-basic" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedbackScore.basic, "string" == typeof this.pages[a].questions[b].feedbackScore.right && ("" === this.pages[a].questions[b].feedbackScore.right || "score-rightwrong" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedbackScore.right, "string" == typeof this.pages[a].questions[b].feedbackScore.wrong && ("" === this.pages[a].questions[b].feedbackScore.wrong || "score-rightwrong" != this.pages[a].questions[b].feedbackType) && delete this.pages[a].questions[b].feedbackScore.wrong), "object" == typeof this.pages[a].questions[b].feedbackScore && this.isEmpty(this.pages[a].questions[b].feedbackScore) && delete this.pages[a].questions[b].feedbackScore, delete this.pages[a].questions[b].feedbackType, this.pages[a].questions[b].asideImg === !1 && ("string" == typeof this.pages[a].questions[b].asideImage && delete this.pages[a].questions[b].asideImage, "string" == typeof this.pages[a].questions[b].imagePosition && delete this.pages[a].questions[b].imagePosition, this.pages[a].questions[b].hasOwnProperty("asideImageScore") && delete this.pages[a].questions[b].asideImageScore), this.pages[a].questions[b].asideImageScore === !1 && delete this.pages[a].questions[b].asideImageScore, delete this.pages[a].questions[b].asideImg, "number" != typeof this.pages[a].questions[b].minHeight && delete this.pages[a].questions[b].minHeight, this.pages[a].questions[b].backgroundImg === !1 && ("string" == typeof this.pages[a].questions[b].bgImg && delete this.pages[a].questions[b].bgImg, "number" == typeof this.pages[a].questions[b].minHeight && delete this.pages[a].questions[b].minHeight), delete this.pages[a].questions[b].backgroundImg, this.pages[a].questions[b].itemsWidth = parseInt(this.pages[a].questions[b].itemsWidth), (0 === this.pages[a].questions[b].itemsWidth || "button" != this.pages[a].questions[b].choicesType) && delete this.pages[a].questions[b].itemsWidth, (this.pages[a].questions[b].keepWidthMobile === !1 || "button" != this.pages[a].questions[b].choicesType && this.pages[a].questions[b].keepWidthMobile === !0) && delete this.pages[a].questions[b].keepWidthMobile, (this.pages[a].questions[b].itemSeparation === !1 || "button" != this.pages[a].questions[b].choicesType && this.pages[a].questions[b].itemSeparation === !0) && delete this.pages[a].questions[b].itemSeparation, (this.pages[a].questions[b].noBorder === !1 || ("button" != this.pages[a].questions[b].choicesType || 1 != this.pages[a].questions[b].images) && this.pages[a].questions[b].noBorder === !0) && delete this.pages[a].questions[b].noBorder, (this.pages[a].questions[b].textLeft === !1 || ("button" != this.pages[a].questions[b].choicesType || this.pages[a].questions[b].images === !0) && this.pages[a].questions[b].textLeft === !0) && delete this.pages[a].questions[b].textLeft, (this.pages[a].questions[b].semitransparent === !1 || "button" != this.pages[a].questions[b].choicesType && "matrix" != this.pages[a].questions[b].type && this.pages[a].questions[b].semitransparent === !0) && delete this.pages[a].questions[b].semitransparent, "single-answer" === this.pages[a].questions[b].type && "string" == typeof this.pages[a].questions[b].solution && (this.pages[a].questions[b].solution = parseInt(this.pages[a].questions[b].solution)), this.pages[a].questions[b].hasOwnProperty("solution") && ("sequence" === this.pages[a].questions[b].type || "matching-pairs" === this.pages[a].questions[b].type || "matrix" === this.pages[a].questions[b].type && this.pages[a].questions[b].graded))
                                    for (var h = 0; h < this.pages[a].questions[b].solution.length; h++) "string" == typeof this.pages[a].questions[b].solution[h] && (this.pages[a].questions[b].solution[h] = parseInt(this.pages[a].questions[b].solution[h]));
                                if ("multiple-answers" === this.pages[a].questions[b].type)
                                    for (var h = this.pages[a].questions[b].solution.length - 1; h >= 0; h--) this.pages[a].questions[b].solution[h] === !0 ? this.pages[a].questions[b].solution[h] = h : this.pages[a].questions[b].solution.splice(h, 1);
                                "long-answer" === this.pages[a].questions[b].type && ("" === this.pages[a].questions[b].sampleSolution ? delete this.pages[a].questions[b].sampleSolution : "string" == typeof this.pages[a].questions[b].sampleSolution && (this.pages[a].questions[b].sampleSolution = f.parseHtml(this.pages[a].questions[b].sampleSolution))), "likert-scale" === this.pages[a].questions[b].type && ("number" != typeof this.pages[a].questions[b].defaultValue && delete this.pages[a].questions[b].defaultValue, this.pages[a].questions[b].showNumberSteps || delete this.pages[a].questions[b].showNumberSteps, "button" === this.pages[a].questions[b].scaleType && (delete this.pages[a].questions[b].defaultValue, delete this.pages[a].questions[b].showNumberSteps), "" === this.pages[a].questions[b].scaleTextLeft && delete this.pages[a].questions[b].scaleTextLeft, "" === this.pages[a].questions[b].scaleTextCenter && delete this.pages[a].questions[b].scaleTextCenter, "" === this.pages[a].questions[b].scaleTextRight && delete this.pages[a].questions[b].scaleTextRight)
                            }
                    this.questionsJSON = {
                        pages: this.pages
                    }
                }, this.onChangeTab = function (a, b) {
                    a > 1 && this.showCode(), 2 == a && (this.iframeLocation = "", e(this.refreshTab.bind(this), 500))
                }, this.refreshTab = function () {
                    this.iframeLocation = "../yourQuiz/preview.html"
                }, f.$watch("tabIndex", this.onChangeTab.bind(this)), f.showingCode = !1, this.showCode = function () {
                    f.createConfigJSON(), this.createQuestionsJSON(), f.configJSON = d.configJSON = this.configJSON, f.questionsJSON = d.questionsJSON = this.questionsJSON, f.showingCode = !0
                }, f.saveQuestionsJSON = function () {
                    this.createQuestionsJSON();
                    http({
                        url: "post.php",
                            method: "POST",
                            data:{type:'question', data: this.questionsJSON}
                        }).success(function(data, status, headers, config) {
                            if(status == 200){
                                alert('Questions saved in DB')
                                console.log(data);
                            }
                        }).error(function(data, status, headers, config) {
                            console.log(status);
                    });
                    // var a, b, d = window.URL || window.webkitURL,
                    //     e = angular.element('<a style="display:none;"></a>'),
                    //     f = c("json")(this.questionsJSON);
                    // a = new Blob([f], {
                    //     type: "application/json;charset=utf-8;"
                    // }), b = d.createObjectURL(a), e.attr("href", b), e.attr("download", "questions.json"), e.attr("id", "download-link"), document.body.appendChild(e[0]);
                    // var g = document.createEvent("MouseEvents");
                    // g.initEvent("click", !0, !0), document.getElementById("download-link").dispatchEvent(g), setTimeout(function () {
                    //     d.revokeObjectURL(b), document.body.removeChild(e[0])
                    // }, 100)
                }, f.saveConfigJSON = function () {
                    console.log(this.settingsService.generalSettings, f.settingsService.generalSettings);
                    f.createConfigJSON();
                    http({
                        url: "post.php",
                            method: "POST",
                            data:{type:'config', data: this.configJSON}
                        }).success(function(data, status, headers, config) {
                            if(status == 200){
                                alert('Configurations saved in DB')
                                console.log(data);
                            }
                        }).error(function(data, status, headers, config) {
                            console.log(status);
                    });
                    // var a, b, d = window.URL || window.webkitURL,
                    //     e = angular.element('<a style="display:none;"></a>'),
                    //     f = c("json")(this.configJSON);
                    // a = new Blob([f], {
                    //     type: "application/json;charset=utf-8;"
                    // }), b = d.createObjectURL(a), e.attr("href", b), e.attr("download", "config.json"), e.attr("id", "download-link"), document.body.appendChild(e[0]);
                    // var g = document.createEvent("MouseEvents");
                    // g.initEvent("click", !0, !0), document.getElementById("download-link").dispatchEvent(g), setTimeout(function () {
                    //     d.revokeObjectURL(b), document.body.removeChild(e[0])
                    // }, 100)
                }, f.saveDataJS = function () {
                    f.createConfigJSON(), this.createQuestionsJSON();
                    http({
                        url: "post.php",
                            method: "POST",
                            data:{type:'data', data: {'question':this.questionsJSON, 'config':this.configJSON}}
                        }).success(function(data, status, headers, config) {
                            if(status == 200){
                                alert('Data saved in DB')
                                console.log(data);
                            }
                        }).error(function(data, status, headers, config) {
                            console.log(status);
                    });
                    // var a, b, d = window.URL || window.webkitURL,
                    //     e = angular.element('<a style="display:none;"></a>'),
                    //     f = "window.quickquizData = {}; \n";
                    // f += "window.quickquizData.config =" + c("json")(this.configJSON) + "; \r", f += "window.quickquizData.questions =" + c("json")(this.questionsJSON) + ";", a = new Blob([f], {
                    //     type: "text/javascript;charset=utf-8;"
                    // }), b = d.createObjectURL(a), e.attr("href", b), e.attr("download", "data.js"), e.attr("id", "download-link"), document.body.appendChild(e[0]);
                    // var g = document.createEvent("MouseEvents");
                    // g.initEvent("click", !0, !0), document.getElementById("download-link").dispatchEvent(g), setTimeout(function () {
                    //     d.revokeObjectURL(b), document.body.removeChild(e[0])
                    // }, 100)
                }
                f.iframeLocation = this.iframeLocation;
                f.configJSON = this.configJSON;
                f.settingsService = this.settingsService;
                f.questionsService = this.questionsService;
                //c.questionsJSON = this.questionsJSON;
            });
        }]
    }
}])