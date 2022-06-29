
var ActivityMain = (function () {
  const _path1 = [1, 2, 3, 4, 5, 6, 7, 11, 12]
  const _path2 = [1, 2, 3, 4, 8, 9, 10, 11, 12]
  const _path1subset = [5, 6, 7]
  const _path2subset = [8, 9, 10]
  const _path3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  var _voltage = 1
  var _currentpath1 = [];
  var _currentpath2 = [];

  var curQtnNo = 1
  var totalQtns = 0
  var correctQtns = 0
  var ratingArray = [0, 0, 0, 0]
  var isRatingCorrectArray = [true, true, true, true]

  return {
    LaunchActivity: function () {
      this.BindDroppables();
      this.BindDraggables();

      $(".dragObjectClone[object='wire']").attr("resistance", 0.0001);
      $(".score_txt").text("" + correctQtns + "/" + totalQtns);
      this.NewQuestion();
    },
    ResetExperiment: function () {
      curQtnNo = 1
      totalQtns = 0
      correctQtns = 0
      _voltage = 1
      this.NewQuestion();
    },
    NewQuestion: function () {
      $(".ques-txt .ques-no").text("Q" + curQtnNo + ":")
      $(".score_txt").text("" + correctQtns + "/" + totalQtns);
      $("#next_btn").hide();
      $("#OK_btn").show();
      $(".correct-mark").remove();
      $(".wrong-mark").remove();
      this.InitDeviceValues();
    },
    InitDeviceValues: function () {
      $(".dragObject[object='bulb']").attr("resistance", 1 + Number(Math.random() * 4));
      $(".dragObject[object='horse']").attr("resistance", 1 + Number(Math.random() * 4));
      $(".dragObject[object='robot']").attr("resistance", 1 + Number(Math.random() * 4));
      $(".dragObject[object='boat']").attr("resistance", 1 + Number(Math.random() * 4));
      for (var i = 0; i <= 3; i++) {
        ratingArray[i] = Number(Math.random() * 5) + 5
        isRatingCorrectArray[i] = (Math.random() > 0.5)
      }
      $(".dragObject[object='bulb']").attr("maxCurrent", ratingArray[0] + 0.1 + int(Math.random() * 1000) / 1000 - (isRatingCorrectArray[0] ? 0 : 2))
      $(".dragObject[object='robot']").attr("maxCurrent", ratingArray[1] + 0.1 + int(Math.random() * 1000) / 1000 - (isRatingCorrectArray[1] ? 0 : 2))
      $(".dragObject[object='boat']").attr("maxCurrent", ratingArray[2] + 0.1 + int(Math.random() * 1000) / 1000 - (isRatingCorrectArray[2] ? 0 : 2))
      $(".dragObject[object='horse']").attr("maxCurrent", ratingArray[3] + 0.1 + int(Math.random() * 1000) / 1000 - (isRatingCorrectArray[3] ? 0 : 2))

      $(".dragObject[object='bulb'] .dragText").text(ratingArray[0] + " Amp Rating")
      $(".dragObject[object='robot'] .dragText").text(ratingArray[1] + " Amp Rating")
      $(".dragObject[object='boat'] .dragText").text(ratingArray[2] + " Amp Rating")
      $(".dragObject[object='horse'] .dragText").text(ratingArray[3] + " Amp Rating")
    },
    Data: function () {
      return {
        "_path": this.SortPathElement(),
        "_path1": _path1,
        "_path2": _path2,
        "_path3": _path3
      }
    },
    OnOrientationChange: function () {

    },
    ToggleVoltage: function (togVal) {
      if (togVal == 1) {
        _voltage++;
      }
      else {
        if (_voltage > 1) {
          _voltage--;
        }
      }
      $(".volt-wrap .voltage").html(_voltage)
    },
    RemovePathElement: function (pathno) {
      for (var i = 0; i < _currentpath1.length; i++) {
        if (_currentpath1[i] === pathno) {
          _currentpath1.splice(i, 1);
          i--;
        }
      }
      for (var i = 0; i < _currentpath2.length; i++) {
        if (_currentpath2[i] === pathno) {
          _currentpath2.splice(i, 1);
          i--;
        }
      }
    },
    AddPathElement: function (pathno) {
      if (Number(pathno) == 8 || Number(pathno) == 9 || Number(pathno) == 10) {
        _currentpath2.push(Number(pathno));
      }
      else if (Number(pathno) == 5 || Number(pathno) == 6 || Number(pathno) == 7) {
        _currentpath1.push(Number(pathno));
      }
      else {
        _currentpath2.push(Number(pathno));
        _currentpath1.push(Number(pathno));
      }
    },
    SortPathElement: function (p_path) {
      p_path.sort(function (a, b) { return a - b });
      return p_path;
    },
    IsPathExist: function (p_path) {
      var isexist = false;
      for (var i = 0; i < p_path.length; i++) {
        if (p_path[i] === pathno) {
          isexist = true;
          break;
        }
      }
      return isexist;
    },
    IsPathEqual: function (a, b) {
      return a.join() == b.join();
    },
    OnCircuitComplete: function () {
      var ispath1complete = false;
      var ispath2complete = false;
      var ispath3complete = false;
      _currentpath1 = this.SortPathElement(_currentpath1);
      _currentpath2 = this.SortPathElement(_currentpath2);
      ispath1complete = this.IsPathEqual(_currentpath1, _path1);
      ispath2complete = this.IsPathEqual(_currentpath2, _path2);
      //ispath3complete = this.IsPathEqual(_path, _path3);
      if (ispath1complete || ispath2complete) {
        if (ispath1complete) {
          for (var i = 0; i < _path1.length; i++) {
            console.log(_path1[i] + "--" + $(".dropped-wire[seq='" + _path1[i] + "']").length)
            $(".dropped-wire[seq='" + _path1[i] + "']").addClass("complete");
            $(".dropped-object[seq='" + _path1[i] + "']").addClass("complete");
          }
          $(".dropwire.ver").addClass("complete");
          $(".dropwire.ver[path='2']").removeClass("complete")
        }
        else {
          for (var i = 0; i < _path1subset.length; i++) {
            console.log(_path1subset[i] + "--" + $(".dropped-wire[seq='" + _path1subset[i] + "']").length)
            $(".dropped-wire[seq='" + _path1subset[i] + "']").removeClass("complete");
            $(".dropped-object[seq='" + _path1subset[i] + "']").removeClass("complete");
          }
        }
        if (ispath2complete) {
          for (var i = 0; i < _path2.length; i++) {
            $(".dropped-wire[seq='" + _path2[i] + "']").addClass("complete");
            $(".dropped-object[seq='" + _path2[i] + "']").addClass("complete");
          }
          $(".dropwire.ver").addClass("complete");
        }
        else {
          for (var i = 0; i < _path2subset.length; i++) {
            console.log(_path2subset[i] + "--" + $(".dropped-wire[seq='" + _path2subset[i] + "']").length)
            $(".dropped-wire[seq='" + _path2subset[i] + "']").removeClass("complete");
            $(".dropped-object[seq='" + _path2subset[i] + "']").removeClass("complete");
          }
        }
      }
      else {
        for (var i = 0; i < _path1.length; i++) {
          console.log(_path1[i] + "--" + $(".dropped-wire[seq='" + _path1[i] + "']").length)
          $(".dropped-wire[seq='" + _path1[i] + "']").removeClass("complete");
          $(".dropped-object[seq='" + _path1[i] + "']").removeClass("complete");
        }
        for (var i = 0; i < _path2.length; i++) {
          $(".dropped-wire[seq='" + _path2[i] + "']").removeClass("complete");
          $(".dropped-object[seq='" + _path2[i] + "']").removeClass("complete");
        }
        $(".dropwire.ver").removeClass("complete");
      }
    },
    BindDraggables: function () {
      //Bind Draggable
      $(".dragObject").draggable({
        container: ".circuit-diagram",
        revert: function (event, ui) {
          $(this).data("uiDraggable").originalPosition = {
            top: $(this).attr("orgTop"),
            left: $(this).attr("orgLeft")
          };

          if (!event) {
            //revert logic
            $(this).removeClass("dropped-object")
          }
          return !event;
        },
        start: function (event, ui) {
          //debugger;
          if (ui.helper.attr("seq")) {
            ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")))
            ui.helper.removeAttr("seq")
            ui.helper.removeAttr("anim")
            ActivityMain.OnCircuitComplete();
          }
          var objType = ui.helper.attr("object")
          ui.helper.removeClass("dropped-object").removeClass("dropped-object-boat")
          if (objType == "bulb") {
            ui.helper.find("img").attr("src", "assets/images/drag_bulb.svg")
          }
          else if (objType == "robot") {
            ui.helper.find("img").attr("src", "assets/images/drag_robot.svg")
          }
          else if (objType == "boat") {
            ui.helper.find("img").attr("src", "assets/images/drag_boat.svg")
          }
          else if (objType == "horse") {
            ui.helper.find("img").attr("src", "assets/images/drag_horse.svg")
          }
          else if (objType == "ammeter") {
            ui.helper.find("img").attr("src", "assets/images/drag_ameter.svg")
          }
        },
        drag: function (event, ui) {
        }
      }).each(function () {
        var top = $(this).position().top;
        var left = $(this).position().left;
        $(this).attr('orgTop', top);
        $(this).attr('orgLeft', left);
      });
      $(".dragObjectClone").draggable({
        container: ".circuit-diagram",
        helper: 'clone',
        revert: function (event, ui) {
          var clone = $(".dragObjectClone.ui-draggable-handle.ui-draggable-dragging")
          clone.fadeOut(500, function () {
            clone.remove();
          });
        },
        start: function (event, ui) {
          //debugger;
          if (ui.helper.attr("seq")) {
            ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")))
            ui.helper.removeAttr("seq")
            ui.helper.removeAttr("anim")
            ActivityMain.OnCircuitComplete();
          }
        },
        drag: function (event, ui) {
        }
      })
    },
    BindDroppables: function () {
      //Bind Droppable
      $(".d-wire-object").droppable({
        accept: ".dragObject",
        tolerance: "touch",
        drop: function (event, ui) {
          //ph - placeholder for wire droppable.
          if (!ui.draggable.attr("seq")) {
            if ($(this).find(".dropped-object").length <= 0) {
              var phPos = $(this).closest(".d-wire").position();
              var objType = ui.draggable.attr("object")
              ui.draggable.addClass("dropped-object").css({
                "left": phPos.left + 20,
                "top": phPos.top - 46
              })
              if (objType == "bulb") {
                ui.draggable.find("img").attr("src", "assets/images/bulb-01.svg")
              }
              else if (objType == "robot") {
                ui.draggable.find("img").attr("src", "assets/images/robot-01.svg")
              }
              else if (objType == "boat") {
                ui.draggable.find("img").attr("src", "assets/images/boat-01.svg")
                ui.draggable.addClass("dropped-object-boat").css({
                  "left": phPos.left + 10,
                  "top": phPos.top - 46
                })
              }
              else if (objType == "horse") {
                ui.draggable.find("img").attr("src", "assets/images/horse-01.svg")
              }
              else if (objType == "ammeter") {
                ui.draggable.find("img").attr("src", "assets/images/ameter-02.svg")
                ui.draggable.addClass("dropped-object").css({
                  "left": phPos.left + 20,
                  "top": phPos.top - 44
                })
              }
              var sequence = $(this).closest(".d-wire").attr("seq");
              var anim = $(this).closest(".d-wire").attr("anim");

              ActivityMain.AddPathElement(sequence)

              ui.draggable.attr("seq", sequence);
              ui.draggable.attr("anim", anim);
              ActivityMain.OnCircuitComplete();
            }
            else {
              $(this).css({
                "left": $(this).attr('orgLeft'),
                "top": $(this).attr('orgTop')
              })
            }
          }
        },
        out: function (event, ui) { }
      });

      $(".d-wire").droppable({
        accept: ".dragObjectClone, .dropped-wire",
        tolerance: "intersect",
        drop: function (event, ui) {
          if (!ui.draggable.attr("seq")) {
            if ($(this).find(".dropped-wire").length <= 0) {
              var clone = $(ui.draggable).clone();
              if (ui.draggable.hasClass("dragObjectClone")) {
                clone.addClass("dropped-wire").removeClass("dragObjectClone")
                $(this).append(clone.css({
                  "left": 0,
                  "top": 0
                }));
                clone.find("img").attr("src", "assets/images/wire-01.svg").addClass("h-wire-img")
                clone.draggable({
                  container: ".circuit-diagram",
                  revert: function (event, ui) {
                    $(this).fadeOut(500, function () {
                      $(this).remove();
                    });
                  },
                  start: function (event, ui) {
                    if (ui.helper.attr("seq")) {
                      ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")));
                      ui.helper.removeAttr("seq");
                      ui.helper.removeAttr("anim");
                      ActivityMain.OnCircuitComplete();
                    }
                    ui.helper.find("img").attr("src", "assets/images/drag_wire.svg").removeClass("h-wire-img")
                  },
                  drag: function (event, ui) {
                  }
                })
              }
              else if (ui.draggable.hasClass("dropped-wire")) {
                $(this).append(clone.css({
                  "left": 0,
                  "top": 0
                }));
                $(ui.draggable).remove();
                clone.find("img").attr("src", "assets/images/wire-01.svg").addClass("h-wire-img")
                clone.draggable({
                  container: ".circuit-diagram",
                  revert: function (event, ui) {
                    $(this).fadeOut(500, function () {
                      $(this).remove();
                    });
                  },
                  start: function (event, ui) {
                    if (ui.helper.attr("seq")) {
                      ActivityMain.RemovePathElement(Number(ui.helper.attr("seq")));
                      ui.helper.removeAttr("seq");
                      ui.helper.removeAttr("anim");
                      ActivityMain.OnCircuitComplete();
                    }
                    ui.helper.find("img").attr("src", "assets/images/drag_wire.svg").removeClass("h-wire-img")
                  },
                  drag: function (event, ui) {
                  }
                })
              }
              var sequence = $(this).attr("seq")
              var anim = $(this).attr("anim");
              ActivityMain.AddPathElement(sequence)
              clone.attr("seq", sequence);
              clone.attr("anim", anim);
              ActivityMain.OnCircuitComplete();
            }
            else {
              ui.helper.fadeOut(500, function () {
                ui.helper.remove();
              });
            }
          }
        },
        out: function (event, ui) { }
      });
    },
    SubmitQuestion: function () {
      if (isRatingCorrectArray[0] == $('input[type="checkbox"][value="bulb"]').prop('checked')) {
        $('input[type="checkbox"][value="bulb"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="bulb"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      if (isRatingCorrectArray[1] == $('input[type="checkbox"][value="robot"]').prop('checked')) {
        $('input[type="checkbox"][value="robot"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="robot"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      if (isRatingCorrectArray[2] == $('input[type="checkbox"][value="boat"]').prop('checked')) {
        $('input[type="checkbox"][value="boat"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="boat"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      if (isRatingCorrectArray[3] == $('input[type="checkbox"][value="horse"]').prop('checked')) {
        $('input[type="checkbox"][value="horse"]').closest(".opt").prepend('<div class="correct-mark"><img src="assets/images/correct-mark.svg"></div>')
        correctQtns++
        totalQtns++
      }
      else {
        $('input[type="checkbox"][value="horse"]').closest(".opt").prepend('<div class="wrong-mark"><img src="assets/images/wrong-mark.svg"></div>')
        totalQtns++
      }
      curQtnNo++
      $(".score_txt").text("" + correctQtns + "/" + totalQtns);
      $("#OK_btn").hide()
      $("#next_btn").show()
    }
  };
})();


$(document).on("click", ".buttonMinus", function (event) {
  ActivityMain.ToggleVoltage(-1);
});
$(document).on("click", ".buttonPlus", function (event) {
  ActivityMain.ToggleVoltage(1);
});

$(document).on("click", "#next_btn", function (event) {
  ActivityMain.NewQuestion();
});

$(document).on("click", "#btn_reset", function (event) {
  ActivityMain.ResetExperiment();
});

$(document).on("click", "#OK_btn", function (event) {
  ActivityMain.SubmitQuestion();
});