document.addEventListener('DOMContentLoaded', function() {
    var mapContainer = document.getElementById('mapContainer');
    var map = document.getElementById('map');
    var detailMap = document.getElementById('detailMap');
    var detailRectangles = document.querySelectorAll('.detailRectangle');
    var detailMapContainer = document.getElementById('detailMapContainer');
    var closeButton = document.getElementById('closeButton');
    var backButton = document.getElementById('backButton');
    var pins = document.querySelectorAll('.pin');

    var detailMapPaths = {
        detail1: "C:\\Users\\81805\\OneDrive\\デスクトップ\\エリアマップ\\生田.jpg",
        detail2: "C:\\Users\\81805\\OneDrive\\デスクトップ\\エリアマップ\\umie.jpg",
        detail3: "C:\\Users\\81805\\OneDrive\\デスクトップ\\エリアマップ\\ハーバー.jpg",
        detail4: "C:\\Users\\81805\\OneDrive\\デスクトップ\\エリアマップ\\三宮.jpg",
        detail5: "C:\\Users\\81805\\OneDrive\\デスクトップ\\エリアマップ\\元町.jpg"
    };

    map.addEventListener('click', function(e) {
        var x = (e.offsetX / map.offsetWidth) * 100;
        var y = (e.offsetY / map.offsetHeight) * 100;

        var clickedRectangle = getClickedRectangle(x, y);
        
        if (clickedRectangle !== null) {
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
        showDetailMap(detailRectangles[0].dataset.detail);  // 詳細マップを再表示
        backButton.style.display = 'none';
        pins.forEach(function(pin) {
            pin.style.display = 'block';
        });
        map.style.filter = 'brightness(0.5)';
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
            pin.style.display = 'none';
        });

        if (detail === 'detail1') {
            pins.forEach(function(pin) {
                pin.style.display = 'block';
            });
        }
    }

    function showPinImage(pinNumber) {
        var pinImagePaths = {
            '1': "C:\\Users\\81805\\OneDrive\\デスクトップ\\map_spot\\1.jpg",
            '2': "C:\\Users\\81805\\OneDrive\\デスクトップ\\map_spot\\2.jpg",
            '3': "C:\\Users\\81805\\OneDrive\\デスクトップ\\map_spot\\3.jpg",
            '4': "C:\\Users\\81805\\OneDrive\\デスクトップ\\map_spot\\4.jpg",
            '5': "C:\\Users\\81805\\OneDrive\\デスクトップ\\map_spot\\5.jpg"
        };

        detailMap.src = pinImagePaths[pinNumber];

        pins.forEach(function(pin) {
            pin.style.display = 'none';
        });

        backButton.style.display = 'block';
    }

    detailRectangles[0].dataset.detail = 'detail1';
    detailRectangles[1].dataset.detail = 'detail2';
    detailRectangles[2].dataset.detail = 'detail3';
    detailRectangles[3].dataset.detail = 'detail4';
    detailRectangles[4].dataset.detail = 'detail5';
});
