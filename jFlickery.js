/**
 *  jFlickery - Flickr API wrapper
 *  Currently covers:
 *    -PhotoSets - getList , getPhotos
 *
 *  This Wrapper makes use of JSONP so if you do modify it ensure that the API endpoint that you use is from a trusted service.
 *
 *  http://edmoremoyo.com
 */

var jFlickery = {};

jFlickery.init = function (spec) {
    "use strict";
    var that = {};

    that.getUserID = function () {
        return spec.myuserid || "";
    };

    that.getPhotoSetID = function () {
        return spec.mysetid || "";
    };

    that.getApiKey = function () {
        return spec.mykey || "";
    };

    that.getApiSecret = function () {
        return spec.mysecret || "";
    };

    that.jsonp = function (callback) {
        var script = document.createElement('script'),
            user_id = that.getUserID(),
            api_key = that.getApiKey(),
            photoset_id = that.getPhotoSetID(),
            base_url = "http://api.flickr.com/services/rest/";

        script.setAttribute('src', base_url +'?method=flickr.'+ callback +'&api_key=' + api_key +'&user_id=' + user_id +'&photoset_id=' + photoset_id +'&format=json&jsoncallback=' + callback);
        script.setAttribute('type','text/javascript');
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    return that;
};

var photosets = {};

photosets.getList = function (data) {
    "use strict";
    var i, a, li, content, div;

    div = document.createElement('div');
    div.setAttribute('class', "links");

    for( i = 0; i < data["photosets"]["photoset"].length; i+=1 ){
        li = document.createElement('li');
        li.setAttribute('class', "link");
        a = document.createElement('a');

        a.setAttribute('id', data["photosets"]["photoset"][i]["id"]);
        a.setAttribute('class', "photoset");
        content = data["photosets"]["photoset"][i]["title"]._content;
        a.innerHTML = content;

        document.getElementsByTagName('body')[0].appendChild(div);
        document.getElementsByClassName('links')[0].appendChild(li);
        document.getElementsByClassName('link')[i].appendChild(a);
    }
};

photosets.getPhotos = function (data) {
    "use strict";
    var i, img, li, content, div;

    div = document.createElement('div');
    div.setAttribute('class', "photos");

    for( i = 0; i < data["photoset"]["photo"].length; i+=1 ){
        var farm = data["photoset"]["photo"][i]["farm"],
            server = data["photoset"]["photo"][i]["server"],
            id = data["photoset"]["photo"][i]["id"],
            secret = data["photoset"]["photo"][i]["secret"];

        li = document.createElement('li');
        li.setAttribute('class', "photo");
        img = document.createElement('img');

        img.setAttribute('src', 'http://farm'+ farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '.jpg');
        img.setAttribute('title', data["photoset"]["photo"][i]["title"]);

        document.getElementsByTagName('body')[0].appendChild(div);
        document.getElementsByClassName('photos')[0].appendChild(li);
        document.getElementsByClassName('photo')[i].appendChild(img);
    }
};
