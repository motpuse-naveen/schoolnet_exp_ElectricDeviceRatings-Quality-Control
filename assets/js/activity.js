var noOfDigits = 1;
var maxTerms = 2;
var birdNameArray = [
  "eagle",
  "hornbill",
  "owl",
  "parrot",
  "pelican",
  "pigeon",
  "robin",
  "sparrow",
  "swan",
  "woodpecker",
];
var birdPluralArray = [
  "eagles",
  "hornbills",
  "owls",
  "parrots",
  "pelicans",
  "pigeons",
  "robins",
  "sparrows",
  "swans",
  "woodpeckers",
];
var birdHtml = {
  "eagleSet_mc":`<div id="eagleSet_mc" class="birds_set_mc"><div class="eaglePix_sym"> </div></div>`,
  "hornbillSet_mc":`<div id="hornbillSet_mc" class="birds_set_mc" ><div class="hornbillPix_sym"> </div></div>`,
  "owlSet_mc":`<div id="owlSet_mc" class="birds_set_mc"><div class="owlPix_sym"> </div></div>`,
  "parrotSet_mc":`<div id="parrotSet_mc" class="birds_set_mc"><div class="parrotPix_sym"> </div></div>`,
  "pelicanSet_mc":`<div id="pelicanSet_mc" class="birds_set_mc" ><div class="pelicanPix_sym"> </div></div>`,
  "woodpeckerSet_mc":`<div id="woodpeckerSet_mc" class="birds_set_mc" ><div class="woodpeckerPix_sym"> </div></div>`,
  "swanSet_mc":`<div id="swanSet_mc" class="birds_set_mc" ><div class="swanPix_sym"> </div></div>`,
  "sparrowSet_mc":`<div id="sparrowSet_mc" class="birds_set_mc" ><div class="sparrowPix_sym"> </div></div>`,
  "robinSet_mc":`<div id="robinSet_mc" class="birds_set_mc" ><div class="robinPix_sym"> </div></div>`,
  "pigeonSet_mc":`<div id="pigeonSet_mc" class="birds_set_mc"><div class="pigeonPix_sym"> </div></div>`
}
var birdVarNameArray = ["a", "b", "c", "d", "e", "x", "y", "z", "n", "m"];
var mStr = "";
var birdCountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var birdOrderArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var exprOrderArray = [0, 1, 2, 3, 4];
//var screenMCXArray = new Array(5);
//var screenMCYArray = new Array(5);
var screenTextArray = new Array(5);

for (var i = 0; i <= 4; i++) {
  //screenMCXArray[i] = $("#set_mc").find("#" + birdNameArray[i] + "Set_mc").css("left");
  //screenMCYArray[i] = $("#set_mc").find("#" + birdNameArray[i] + "Set_mc").css("top");
  screenTextArray[i] = $("#set_mc").find("#bird" + (i + 1) + "_set_mc_txt");
}

var explainMCXArray = new Array(5);
var explainMCYArray = new Array(5);
var explainTextArray = new Array(5);

for (var j = 0; j <= 4; j++) {
  explainMCXArray[j] = $("#explain_mc").find("#" + birdNameArray[j] + "Explain_mc").css("left");
  explainMCYArray[j] = $("#explain_mc").find("#" + birdNameArray[j] + "Explain_mc").css("top");
  explainTextArray[j] = $("#explain_mc").find("#bird" + (j + 1) + "_birdsExplain_txt");
}

var curQtnNo = 1;
var totalQtns = 0;
var correctQtns = 0;
$(".score_txt").text("" + correctQtns + "/" + totalQtns);

var noOfTerms;
var valueOfExpr = 0;

var EvaluateAlgebraicExpressions = (function () {
  return {
    LaunchActivity: function () {
      //nm
      for (var i = 0; i < birdNameArray.length; i++) {
        initSet($("#set_mc").find("#" + birdNameArray[i] + "Set_mc"), birdNameArray[i] + "Pix_sym");
      }
      noOfDigits = Number($("#noOfDigitsInput_txt").val());
      maxTerms = Number($("#maxTermsInput_txt").val());
      resetExperiment();
    },

    OnOrientationChange: function () {
      
    },
  };
})();

$(".noOfDigits_cont .btn_minus").on("click", function () {
  noOfDigits_cmb_Listener("minus");
});

$(".noOfDigits_cont .btn_plus").on("click", function () {
  noOfDigits_cmb_Listener("plus");
});

function noOfDigits_cmb_Listener(id) {
  var min = Number($("#noOfDigitsInput_txt").attr('min'));
  var value = Number($("#noOfDigitsInput_txt").val());
  var max = Number($("#noOfDigitsInput_txt").attr('max'));
  if (id === "minus") {
    value = Number($($("#noOfDigitsInput_txt").val(value - 1)).val());
  }
  if (id === "plus") {
    value = Number($($("#noOfDigitsInput_txt").val(value + 1)).val());
  }

  if (value === min) {
    $(".noOfDigits_cont .btn_minus").attr("disabled", "disaled");
  } else {
    $(".noOfDigits_cont .btn_minus").removeAttr("disabled");
  }

  if (value === max) {
    $(".noOfDigits_cont .btn_plus").attr("disabled", "disaled");
  } else {
    $(".noOfDigits_cont .btn_plus").removeAttr("disabled");
  }

  noOfDigits = value;
  resetExperiment();
}

$(".maxTerms_cont .btn_minus").on("click", function () {
  maxTerms_cmb_Listener("minus");
});

$(".maxTerms_cont .btn_plus").on("click", function () {
  maxTerms_cmb_Listener("plus");
});

function maxTerms_cmb_Listener(id) {
  var min = Number($("#maxTermsInput_txt").attr('min'));
  var value = Number($("#maxTermsInput_txt").val());
  var max = Number($("#maxTermsInput_txt").attr('max'));
  if (id === "minus") {
    value = Number($($("#maxTermsInput_txt").val(value - 1)).val());
  }
  if (id === "plus") {
    value = Number($($("#maxTermsInput_txt").val(value + 1)).val());
  }

  if (value === min) {
    $(".maxTerms_cont .btn_minus").attr("disabled", "disaled");
  } else {
    $(".maxTerms_cont .btn_minus").removeAttr("disabled");
  }

  if (value === max) {
    $(".maxTerms_cont .btn_plus").attr("disabled", "disaled");
  } else {
    $(".maxTerms_cont .btn_plus").removeAttr("disabled");
  }

  maxTerms = value;
  resetExperiment();
}

function resetExperiment() {
  mStr = "";
  curQtnNo = 1;
  totalQtns = 0;
  correctQtns = 0;
  $(".score_txt").text("" + correctQtns + "/" + totalQtns);
  //$("#next_btn").hide();
  newQuestion();
}

function newQuestion() {
  $("#explain_mc").hide();
  var tenFactor = 1;
  for (var i = 1; i <= noOfDigits; i++) {
    tenFactor = tenFactor * 10;
  }

  for (var j = 0; j < birdNameArray.length; j++) {
    birdCountArray[j] = parseInt(Math.random() * (tenFactor - 1)) + 1;
    //$("#set_mc").find("#" + birdNameArray[j] + "Set_mc").hide();
    //$("#set_mc").find("#" + birdNameArray[j] + "Set_mc").css({ left: 0, top: 0 });
  }

  shuffle(birdOrderArray);

  for (var k = 0; k <= 4; k++) {
    //$("#set_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Set_mc").show();
    //$("#set_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Set_mc").css({ left: Math.round($(screenTextArray[k]).position().left) - 20, top: Math.round($(screenTextArray[k]).position().top) + 8 });
    $(screenTextArray[k]).find(".birds_set_mc").remove();
    $(screenTextArray[k]).prepend(birdHtml[birdNameArray[birdOrderArray[k]] + "Set_mc"])
    $(screenTextArray[k]).find(".expr-text").html("<i>" + birdVarNameArray[birdOrderArray[k]] + "</i> = " + "No. of " + birdPluralArray[birdOrderArray[k]] + " = " + birdCountArray[birdOrderArray[k]]);
  }

  shuffle(exprOrderArray);

  $(".qNo_txt").html("<div>Q " + curQtnNo + "</div><div> What is the value of:<div>");
  $("#explain_mc").hide();
  $("#OK_btn").show();
  $(".correct_mc").hide();
  $(".wrong_mc").hide();
  $(".ans_content").removeClass("wrong_txt");
  $("#numbInput_txt").val('');
  $("#numbInput_txt").removeAttr("disabled");

  noOfTerms = parseInt(Math.random() * (maxTerms - 1)) + 2;
  mStr = "";
  valueOfExpr = 0;
  for (var l = 0; l < noOfTerms; l++) {
    mStr = mStr + birdVarNameArray[birdOrderArray[exprOrderArray[l]]];
    valueOfExpr = valueOfExpr + birdCountArray[birdOrderArray[exprOrderArray[l]]];
    mStr = mStr + " + ";
  }

  mStr = mStr.substring(0, mStr.length - 3);
  $(".correctAnswer_txt").hide();
  $(".correctAnswer_txt").html("");
  
  $(".qtn_txt").text(mStr);
}
function initSet(my_mc, myLibStr) {
  var pix_mc;
  pix_mc = ('<div class="' + myLibStr + '"> </div>');
  $(my_mc).append(pix_mc);
}

$("#btn_reset").on("click", function () {
  ScreenSplitter.ResetSplit();
  resetExperiment();
  $("#next_btn").hide();
  $("#explain_btn").hide();
});

$("#OK_btn").on("click", function () {
  $("#OK_btn").hide();
  $("#next_btn").show();
  $("#explain_btn").show();
  $("#numbInput_txt").attr("disabled", "disabled");
  if (Number($("#numbInput_txt").val()) == valueOfExpr) {
    correctQtns++;
    totalQtns++;
    $(".score_txt").text("" + correctQtns + "/" + totalQtns);
    $(".correct_mc").show();
    $(".ans_content").removeClass("wrong_txt");
  } else {
    totalQtns++;
    $(".score_txt").text("" + correctQtns + "/" + totalQtns);
    $(".wrong_mc").show();
    $(".correctAnswer_txt").show();
    $(".correctAnswer_txt").html("Correct Answer = <span>" + valueOfExpr + "</span>");
    $(".ans_content").addClass("wrong_txt");
  }
});

$("#next_btn").on("click", function () {
  curQtnNo++;
  newQuestion();
  $("#next_btn").hide();
  $("#explain_btn").hide();
});

$("#explain_btn").on("click", function () {
  //close other popup
  $(".popup").hide();
  $(".active").removeClass("active")
  ActivityShell.AdjustSplitPanelsOnClosePopup();
  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"));
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"));

  $("#OK_btn, #btn_reset, #explain_btn, #next_btn").removeAttr("disabled");


  $("#explain_mc").show();

  for (var i = 0; i < birdNameArray.length; i++) {
    $("#explain_mc").find("#" + birdNameArray[i] + "Explain_mc").hide();
    $("#explain_mc").find("#" + birdNameArray[i] + "Explain_mc").css({ left: 0, top: 0 });
  }

  for (var k = 0; k <= 4; k++) {
    console.log(explainMCXArray[k], explainMCYArray[k]);
    $("#explain_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Explain_mc").show();
    // $("#explain_mc").find("#"+birdNameArray[birdOrderArray[k]] + "Explain_mc").css({left: explainMCXArray[k], top: explainMCYArray[k]});   
    $("#explain_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Explain_mc").css({ left: Math.round($(explainTextArray[k]).position().left) + 30, top: Math.round($(explainTextArray[k]).position().top) });
    $(explainTextArray[k]).html("<i>" + birdVarNameArray[birdOrderArray[k]] + "</i> = " + "Number of " + birdPluralArray[birdOrderArray[k]] + " = " + birdCountArray[birdOrderArray[k]]);

    var col = $(".Explain_mc_birdrow").find(".bird"+ (k+1))
    col.empty();
    col.append($("#explain_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Explain_mc").clone().removeAttr("id").removeAttr("style"))
    col.append($("<p class='bold birdtext'>").html("<i>" + birdVarNameArray[birdOrderArray[k]] + "</i> = " + "Number of " + birdPluralArray[birdOrderArray[k]] + " = " + birdCountArray[birdOrderArray[k]]));
  }

  for (var j = 0; j <= 4; j++) {
    if (j < noOfTerms) {
      $("#explain_mc").find("#expr" + (j + 1) + "_txt").text(birdVarNameArray[birdOrderArray[exprOrderArray[j]]]);
      $("#explain_mc").find("#val" + (j + 1) + "_txt").text("" + birdCountArray[birdOrderArray[exprOrderArray[j]]]);

      $("#explain_mc").find("#expr" + (j + 1) + "_txt").show();
      $("#explain_mc").find("#val" + (j + 1) + "_txt").show();

      if (j > 0) {
        $("#explain_mc").find("#exprPlus" + j + "_mc").show();
        $("#explain_mc").find("#valPlus" + j + "_mc").show();
      }
    } else {
      $("#explain_mc").find("#expr" + (j + 1) + "_txt").hide();
      $("#explain_mc").find("#val" + (j + 1) + "_txt").hide();

      if (j > 0) {
        $("#explain_mc").find("#exprPlus" + j + "_mc").hide();
        $("#explain_mc").find("#valPlus" + j + "_mc").hide();
      }
    }
  }

  $("#explain_mc #answer_txt").text(valueOfExpr);
  $("#OK_btn, #btn_reset, #explain_btn, #next_btn, #btn_info").attr("disabled","disabled");
});

$("#explain_mc #closeIcon_mc").on("click", function () {
  $("#explain_mc").hide();
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
