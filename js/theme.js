(function () {
    const toggle = document.querySelector(".theme-toggle");
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || "light";

    document.body.dataset.theme = initialTheme;

    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", () => {
        const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    });
})();
