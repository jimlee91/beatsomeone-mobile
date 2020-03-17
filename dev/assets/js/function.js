function time_convert(num) {
  var minutes = Math.floor(num / 60);
  var seconds = num % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

var _GLOBAL_ACTIONS = {}; // 각 액션들이 담기는 객체
function setAudioInstance(item) {
  var audio = WaveSurfer.create({
    container: "#playList__item" + item.id + " .wave",
    waveColor: "#696969",
    progressColor: "#c3ac45",
    hideScrollbar: true,
    height: 90
  });
  audio.load(item.audioFile);
  audio.on("play", function(e) {
    console.log(audio.getCurrentTime());
    document
      .querySelector("#playList__item" + item.id)
      .classList.add("playing");
  });
  audio.on("pause", function(e) {
    var actionTarget = "playAction" + item.id;
    document
      .querySelector("#playList__item" + item.id)
      .classList.remove("playing");
  });

  var actionName = "playAction" + item.id;
  _GLOBAL_ACTIONS[actionName] = audio;
}
document.addEventListener("DOMContentLoaded", function() {
  [].forEach.call(document.querySelectorAll("[data-action]"), function(el) {
    el.addEventListener("click", function(e) {
      var action = e.currentTarget.dataset.action;
      if (action in _GLOBAL_ACTIONS) {
        e.preventDefault();
        Object.keys(_GLOBAL_ACTIONS).map(function(key) {
          if (_GLOBAL_ACTIONS[key] !== _GLOBAL_ACTIONS[action]) {
            _GLOBAL_ACTIONS[key].stop();
          }
        });
        _GLOBAL_ACTIONS[action].playPause();
      }
    });
  });
});

function renderPlaylist(arr) {
  _.each(arr, function(item, index) {
    document
      .getElementById("playList__list")
      .insertAdjacentHTML("beforeend", template(item));

    setAudioInstance(item);
  });
}

function renderPlaylistNoDepth(arr) {
  _.each(arr, function(item, index) {
    document
      .getElementById("playList__list")
      .insertAdjacentHTML("beforeend", template(item));

    setAudioInstance(item);
  });
}

$(function() {
  $(".filter__title").on("click", function() {
    $(this).toggleClass("folded");
    $(this)
      .siblings(".filter__content")
      .stop()
      .slideToggle();
  });

  $('.showFilter').on('click', function(){
    $(this).toggleClass('js-active');
    $('.sublist__filter').toggleClass('js-active');
    if( $('.sublist__filter').hasClass('js-active') ) {
      $('body').css('overflow', 'hidden')
    } else {
      $('body').css('overflow', 'auto')
    }
  })

  // BPM range
  if ($(".bpmRange").length) {
    $(".bpmRange input").ionRangeSlider({
      skin: "round",
      type: "double",
      min: 0,
      max: 170,
      from: 0,
      to: 125,
      onStart: function(data) {
        $("#bpm-start").val(data.from_pretty);
        $("#bpm-end").val(data.to_pretty);
      },
      onChange: function(data) {
        $("#bpm-start").val(data.from_pretty);
        $("#bpm-end").val(data.to_pretty);
      }
    });
  }
  // 메인 trend Slider
  var slideOption = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "25px",
    arrows: false,
    dots: true
  };
  $(".trending__slider .slider").slick(slideOption);
  $(".topFive .topFice__slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "25px",
    arrows: false,
    dots: false
  });
  // 메인페이지: 서브 앨범 슬라이드 이벤트
  $(".toggle-subList").on("click", function() {
    var itemLength = $(this)
      .parents(".playList__itembox")
      .find(".subPlayList .playList__itembox").length;
    $(this).toggleClass("active");
    $(this)
      .parents(".playList__itembox")
      .toggleClass("is-show-children");

    if ($(this).hasClass("active")) {
      // active 일때,
      $(this)
        .parents(".playList__itembox")
        .find(".subPlayList")
        .css("height", 90 * itemLength);
    } else {
      // 지웟을때,
      $(this)
        .parents(".playList__itembox")
        .find(".subPlayList")
        .css("height", 0);
    }
  });

  // 커스텀 셀렉트 옵션
  $(".custom-select").on("click", function() {
    $(this)
      .siblings(".custom-select")
      .removeClass("active")
      .find(".options")
      .hide();
    $(this).toggleClass("active");
    $(this)
      .find(".options")
      .toggle();
  });

  $('.header__nav').on('click', function(e) {
    e.preventDefault();
    $('.gnb').show();
  })
  $('.gnb__bg').add('.gnb__close').on('click', function(e) {
    e.preventDefault();
    $('.gnb').hide();
  })
});
// 윈도우 스크롤 했을때,
$(window).scroll(function() {
  var t = $("html, body").scrollTop();
  if (t > 10) {
    $(".header").addClass("scrolled");
  } else {
    $(".header").removeClass("scrolled");
  }
});
