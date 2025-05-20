let iframe = null;

// Whenever the URL hash changes, this function will be called
const handleHashChange = function(e) {
    console.log('Hash changed');
    if (!e)
        return loadPage('');
    const hash = e.newURL.split('#')[1];
    const page = hash ? hash : '';
    return loadPage(page);
}

// Loads into the iframe the page specified in the hash
// Tells the server to add the embed option to filter displayed elements
const loadPage = function(page) {
    const url = `/${page}?embed=true`;
    if (!iframe)
        return
    iframe.src = url;
    console.log(`Loading page: ${url}`);
}

// When the DOM is fully loaded, set up the iframe and handle the hash change
document.addEventListener("DOMContentLoaded", function(event) {
    iframe = document.getElementById('iframe');
    handleHashChange();
    disableEmbed();
});

// Disable the embed option when the page is accessed directly
const disableEmbed = function() {
    const pathUrl = window.location.pathname;
    const pathUrlArray = pathUrl.split("/");

    if (pathUrlArray[pathUrlArray.length - 1] !== '') {
        const links = document.querySelectorAll(".tabs");
        for (const item of links) {
            if (item && item.href)
                item.href = item.href.replace("#", "");
        }
    }
}

// Listen for hash changes in the URL
window.addEventListener('hashchange', (e) => handleHashChange(e));