let image1 = true;

$('#searchbtn').click(apiSearch);
$('#timebtn').click(getTime);
$('#luckybtn').click(luckedOut);
$('.searchEngName').click(backgroundChange);

function getTime() {
    var today = new Date();
    var hr = String(today.getHours()).padStart(2,0);
    var min = String(today.getMinutes()).padStart(2, 0);
    var time = '';
    time += `<p>${hr}:${min}</p>`;
    $('#time').html(time);
    $('#time').css('display', 'block');
    $('#time').dialog({
        title: "time",
        height: 130,
        width: 150,
        position: {
            at: "center"
        }
    });
};

function apiSearch(){
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '127e25bcb52f4650b06b0ec3dab7fb2a'
        }
    })
    .done(function (data) {
        var len = data.webPages.value.length;
        var results = '';
        for (i = 0; i < len; i++) {
            results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
        }
        var queryName = data.queryContext.originalQuery;
        $('#searchResults').html(results);
        $('#searchResults').css('display', 'block');
        $('#searchResults').dialog({
            title: queryName,
            height: 370,
            width: 900,
            position: {
                at: "center bottom",
                my: "center top",
                of: $('.popups')
            }

        });

    })
    .fail(function () {
        alert('error');
    });
};

function luckedOut() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '127e25bcb52f4650b06b0ec3dab7fb2a'
        }
    })
        .done(function (data) {
            var firstPageUrl = data.webPages.value[0].displayUrl;
            window.open(firstPageUrl, "_blank").focus();
            
        })
        .fail(function () {
            alert('error');
        });
};

function backgroundChange() {
    image1 = !image1;
    if (image1) {
        $('body,html').css('background-image', 'url(./dog.jpg)');
    }
    else {
        $('body,html').css('background-image', 'url(./cat.jpg)');
    }
}
