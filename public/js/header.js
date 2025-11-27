// Announcement banner
const announcementHide = document.getElementById("announcementHide");
const announcementBanner = document.getElementById("announcementBanner");

announcementHide.addEventListener("click", () => {
    announcementBanner.classList.add("hide");
});

// Mobile navbar
const navbarMobileToggle = document.getElementById("navbarMobileToggle");
const navbarMobile = document.getElementById("navbarMobile");
const listIconContent = '<i class="bi bi-list"></i>';
const xIconContent = '<i class="bi bi-x"></i>';

navbarMobileToggle.addEventListener("click", () => {
    if (navbarMobile.classList.contains("show")) {
        navbarMobile.classList.remove("show");
        navbarMobileToggle.innerHTML = listIconContent;
    } else {
        navbarMobile.classList.add("show");
        navbarMobileToggle.innerHTML = xIconContent;
    }
});
