var rssUrl = "http://www.roboku.com/rss.xml";

function rssTime(time) {
    var pubDate = time;

    var date = new Date(pubDate);
    var timestamp = Math.round(date.getTime() / 1000);
    return timestamp;
}
function getRssFeed() {
    var startTime = Math.round($.now() / 1000);
    var FEED_URL = rssUrl+'?' + $.now() + '';
    
    jQuery.ajax({
        url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
        dataType: 'json',
        success: function(data) {
            var html = '';
            //console.log(data.responseData.feed.entries[0].mediaGroups[0].contents[0].url);
            if (data.responseData.feed && data.responseData.feed.entries) {
                $.each(data.responseData.feed.entries, function(i, e) {
                    i++;
                    console.log(e);
                   
                    var img = e.mediaGroups[0].contents[0].url;
           
                    var title = e.title;
                    var url = e.link;
                    var addTime = rssTime(e.publishedDate);
                    var timer = startTime - addTime;
                    timer = Math.round(timer / 60);
                    if(timer < 60 ) {
                        timer = timer+' min ago';
                    } else if(timer >= 60) {
                        timer = Math.round(timer / 60)+' hour ago';
                    }
                    html += '<a title="'+title+'" href="' + url + '" class="box" target="_blank">';
                    html += '   <div><img src="' + img + '" width="250" height="383"  /></div>';
                    html += '   <span class="text-cont">' + title + '</span>';
                    html += '</a>';
                    var addTime = rssTime(e.publishedDate);

                });
            }
            jQuery('.rss-inner').append(html);
        }

    });
}

jQuery(document).ready(function() {
    getRssFeed();
    
});

