// ## GIVEN ##

const NR_OF_BACKGROUNDS = 3;

function initNavigation(){
    console.log("initNavigation");
    document.querySelectorAll("button .nav").forEach((button) => {
        button.addEventListener("click", navigate);
    });
}

function navigate(e){
    e.preventDefault();
    const target = e.target;
    navigateToPage(target);
}

function navigateToPage(targetId){
    document.querySelectorAll(".page").forEach(page => {
        if (page.id === targetId){
            page.classList.remove("hidden");
        } else {
            page.classList.add("hidden");
        }
    });
}

export { initNavigation, navigateToPage };
// ## YOUR ADDED FUNCTIONS ##
