/*DND-2 Preloader */
var imagePreCount = 0;
var audioPreCount = 0;
var imgPreloadArray = new Array(
  "assets/images/check-icn.svg",
  "assets/images/drag-btn-horizontal.svg",
  "assets/images/drag-btn-vertical.svg",
  "assets/images/logo.svg",
  "assets/images/next-arrow.svg",
  "assets/images/phone-landscape-pngrepo-com.png",
  "assets/images/phone-portrait-pngrepo-com.png",
  "assets/images/texture.svg",
  "assets/images/theme-icon-outline-left.svg",
  "assets/images/theme-icon-outline-right.svg",
  "assets/images/watermark-2.png",
  "assets/images/volt-increase.svg",
  "assets/images/volt-decrease.svg",
  "assets/images/drag_bulb.svg",
  "assets/images/drag_robot.svg",
  "assets/images/drag_boat.svg",
  "assets/images/drag_horse.svg",
  "assets/images/drag_ameter.svg",
  "assets/images/bulb-01.svg",
  "assets/images/bulb-02.svg",
  "assets/images/bulb-03.svg",
  "assets/images/robot-01.svg",
  "assets/images/robot-02.svg",
  "assets/images/boat-01.svg",
  "assets/images/boat-02.svg",
  "assets/images/horse-01.svg",
  "assets/images/horse-02.svg",
  "assets/images/ameter-01.svg",
  "assets/images/ameter-02.svg",
  "assets/images/wire-01.svg",
  "assets/images/wire-02.svg",
  "assets/images/wire-03.svg",
  "assets/images/wire-04.svg",
  "assets/images/instr1.svg",
  "assets/images/instr2.svg",
  "assets/images/correct-mark.svg",
  "assets/images/wrong-mark.svg",
);

/*--Audio--*/
var audioPreloadArray = [];
$(document).ready(function () { });
//Html is bydefault added to html
//generatePreloader();
setTimeout(function () {
  preloadImages();
}, 50);

function generatePreloader() {
  var preloaderhtml = `<div class="preloader">
  <div class="preloadpanel">
     <div class="preloadingInstr">
         <div class="progress"></div>
         <div class="progress-text">
             Loading ... 100%
         </div>
     </div>
 </div> 
</div>`;
  $("body").append(preloaderhtml);
}

function preloadImages() {
  imagePreCount = 0;
  for (var pId = 0; pId < imgPreloadArray.length; pId++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = imgPreloadArray[pId];
  }
}
function imagePreloaded() {
  imagePreCount++;
  var percentageload = Number(
    ((imagePreCount / imgPreloadArray.length) * 100).toFixed(0)
  );
  $(".preloader .progress-text").text("Loading..." + percentageload + "%");
  if (imagePreCount == imgPreloadArray.length) {
    setTimeout(function () {
      $(".preloader").remove();
      $(".container-so.launch").show();
      ActivityShell.Init();
    }, 50);
  }
}
