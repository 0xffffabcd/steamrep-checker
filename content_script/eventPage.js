/**
 * Source: https://stackoverflow.com/a/7699773/
 *
 * Possible parameters for request:
 *  action: "xhttp" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */
chrome.runtime.onMessage.addListener((request, sender, callback) => {
    if (request.action === "xhttp") {
        const xhttp = new XMLHttpRequest();
        const method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = () => {
            callback(xhttp.responseText);
        };
        xhttp.onerror = () => {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback(-1);
        };
        xhttp.open(method, request.url, true);
        if (method === 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send();
        return true; // prevents the callback from being called too early on return
    }
});