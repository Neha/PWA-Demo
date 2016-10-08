self.addEventListener("install",function(event){
	event.waitUntil(
		caches.open("sw1").then(function(cache){
			cache.addAll([
					"/offline.html",
					"/resources/js/app.js",
                    "/resources/style/style.css",
                    "/index.html",
                    "/resources/js/jquery-3.1.1.min.js"
				])

		}))
})

var doesRequestAcceptHtml = function (request) {
    return request.headers.get('Accept')
        .split(',')
        .some(function (type) { return type === 'text/html'; });
};

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (doesRequestAcceptHtml(request)) {
        event.respondWith(
            fetch(request)
                .catch(function () {
                    return caches.match('/offline.html');
                })
        );
    } else {
        event.respondWith(
            caches.match(request)
                .then(function (response) {
                    return response || fetch(request);
                })
        );
    }
});