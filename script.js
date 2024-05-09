document.addEventListener('DOMContentLoaded', function() {
    var initialScreen = document.getElementById('initialScreen');
    var mapContainer = document.getElementById('mapContainer');
    var topImage = document.getElementById('topImage');
    var map = document.getElementById('map');
    var detailMap = document.getElementById('detailMap');
    var detailRectangles = document.querySelectorAll('.detailRectangle');
    var detailMapContainer = document.getElementById('detailMapContainer');
    var closeButton = document.getElementById('closeButton');
    var backButton = document.getElementById('backButton');
    var pins = document.querySelectorAll('.pin');

    var detailMapPaths = {
      detail1: "エリアマップ/駅北.jpg", 
        detail2: "エリアマップ/元町.jpg",
        detail3: "エリアマップ/三宮.jpg",
        detail4: "エリアマップ/海側.jpg",
    };

    var pinImagePaths = {};

    

    for (var i = 1; i <= 42; i++) {
        pinImagePaths[i.toString()] = "スポット/" + i + ".jpg";
    }

   
    // すべての画像のURLを収集する
    var preloadImages = [];
    for (var key in pinImagePaths) {
        preloadImages.push(pinImagePaths[key]);
    }
    for (var key in detailMapPaths) {
        preloadImages.push(detailMapPaths[key]);
    }

    
    
    // すべての画像をプリロードする
    preloadImages.forEach(function(url) {
        var img = new Image();
        img.src = url;
    });

    var previousDetail = null;

    topImage.addEventListener('click', function() {
        initialScreen.style.display = 'none';
        mapContainer.style.display = 'block';
        map.src = "エリアマップ/全体.jpg"; // ここで全体マップの画像のパスを指定
    });

    map.addEventListener('click', function(e) {
        var x = (e.offsetX / map.offsetWidth) * 100;
        var y = (e.offsetY / map.offsetHeight) * 100;

        var clickedRectangle = getClickedRectangle(x, y);

        if (clickedRectangle !== null) {
            previousDetail = clickedRectangle.dataset.detail;
            showDetailMap(clickedRectangle.dataset.detail);

            e.preventDefault();
        }
    });

    pins.forEach(function(pin) {
        pin.addEventListener('click', function(e) {
            var pinNumber = pin.getAttribute('data-pin');
            showPinImage(pinNumber);
        });
    });

    closeButton.addEventListener('click', function() {
        detailMapContainer.style.display = 'none';
        map.style.filter = 'none';
    });

    backButton.addEventListener('click', function() {
        if (previousDetail) {
            showDetailMap(previousDetail);
        }
        backButton.style.display = 'none'; // backButtonを非表示
    });

    function getClickedRectangle(x, y) {
        for (var i = 0; i < detailRectangles.length; i++) {
            var rect = detailRectangles[i];
            var rectLeft = parseFloat(rect.style.left);
            var rectTop = parseFloat(rect.style.top);
            var rectWidth = rect.offsetWidth * 0.28;  // 28%の幅
            var rectHeight = rect.offsetHeight * 0.23;  // 23%の高さ

            var rectRight = rectLeft + rectWidth;
            var rectBottom = rectTop + rectHeight;

            if (x >= rectLeft && x <= rectRight && y >= rectTop && y <= rectBottom) {
                return rect;
            }
        }
        return null;
    }

    function showDetailMap(detail) {
        detailMap.src = detailMapPaths[detail];
        detailMapContainer.style.display = 'block';
        map.style.filter = 'brightness(0.5)';

        pins.forEach(function(pin) {
            var pinNumber = parseInt(pin.getAttribute('data-pin')); // ピンの番号を取得
            var pinDetail = '';

            // ピンの詳細地図を決定
            if (pinNumber >= 1 && pinNumber <= 10) {
                pinDetail = 'detail1';
            } else if (pinNumber >= 11 && pinNumber <= 21) {
                pinDetail = 'detail2';
            } else if (pinNumber >= 22 && pinNumber <= 34) {
                pinDetail = 'detail3';
            } else if (pinNumber >= 35 && pinNumber <= 42) {
                pinDetail = 'detail4';
            }

            // ピンが選択された詳細地図に関連する場合のみ表示
            if (pinDetail === detail) {
                pin.style.display = 'block';
            } else {
                pin.style.display = 'none';
            }
        });

        previousDetail = detail; // previousDetailを設定
    }

    function showPinImage(pinNumber) {
        detailMap.src = pinImagePaths[pinNumber];
        pins.forEach(function(pin) {
            pin.style.display = 'none';
        });
        backButton.style.display = 'block'; // pinImageが表示されている場合のみbackButtonを表示
    }

    detailRectangles[0].dataset.detail = 'detail1';
    detailRectangles[1].dataset.detail = 'detail2';
    detailRectangles[2].dataset.detail = 'detail3';
    detailRectangles[3].dataset.detail = 'detail4';
});
