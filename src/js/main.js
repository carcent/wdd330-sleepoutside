import Alert from "./Alert";
import { loadHeaderFooter } from "./utils.mjs"

const alert = new Alert();
alert.init();

loadHeaderFooter();

loadHeaderFooter().then(()=> {
    const form = qs("#searchForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = qs("#seachInput").value.trim();
            if (query) {
                window.location.href = `/search.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
});