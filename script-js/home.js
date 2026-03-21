let currentTab = "all";
const tabActive = ["bg-primary", "border-primary", "text-white"];
const tabInActive = ["bg-transparent", "text-slate-700", "border-slate-300", "text-black"];

const allContener = document.getElementById("all-contener");
const interviewContener = document.getElementById("interview-contener");
const rejectedContener = document.getElementById("rejected-contener");
const availebleStat = document.getElementById("availeble"); 

function updateEmptyState() {

    const containers = [allContener, interviewContener, rejectedContener];
    
    containers.forEach(container => {
        if(!container) return;
        const cards = container.querySelectorAll(".all-contener").length;

        const emptyMsg = container.querySelector(".empty-msg") || container.querySelector("section:not(.all-contener)"); 
        
        if (emptyMsg) {
            if (cards > 0) {
                emptyMsg.classList.add("hidden");
            } else {
                emptyMsg.classList.remove("hidden"); 
            }
        }
    });
}


function updateCount() {
    let count = 0;

    if (currentTab === "all") {
        count = allContener.querySelectorAll(".all-contener").length;
    } else if (currentTab === "interview") {
        count = interviewContener.querySelectorAll(".all-contener").length;
    } else if (currentTab === "rejected") {
        count = rejectedContener.querySelectorAll(".all-contener").length;
    }


    if (availebleStat) {
        availebleStat.innerText = count;
    }

    const totalJobs = allContener.querySelectorAll(".all-contener").length;
    const totalDisplay = document.getElementById("ster-total");
    if(totalDisplay) totalDisplay.innerText = totalJobs;

    const interviewCount = interviewContener.querySelectorAll(".all-contener").length;
    const interviewDisplay = document.querySelector("#ster-interview")?.nextElementSibling;
    if(interviewDisplay) interviewDisplay.innerText = interviewCount;
    
    const rejectedCount = rejectedContener.querySelectorAll(".all-contener").length;
    const rejectedDisplay = document.querySelector("#ster-rejected")?.nextElementSibling;
    if(rejectedDisplay) rejectedDisplay.innerText = rejectedCount;
    updateEmptyState();
}
function switchTab(tab) {
    currentTab = tab; 
    const tabs = ["all", "interview", "rejected"];
    
    tabs.forEach(t => {
        const tabBtn = document.getElementById("tab-" + t);
        if (tabBtn) {
            if (t === tab) {
                tabBtn.classList.remove(...tabInActive);
                tabBtn.classList.add(...tabActive);
            } else {
                tabBtn.classList.remove(...tabActive);
                tabBtn.classList.add(...tabInActive);
            }
        }
    });
    allContener.classList.toggle("hidden", tab !== "all");
    interviewContener.classList.toggle("hidden", tab !== "interview");
    rejectedContener.classList.toggle("hidden", tab !== "rejected");

    updateCount();
}
function handleAction(event) {
    const clickedElement = event.target;
    const card = clickedElement.closest(".all-contener");
    
    if (!card) return;

    const statusBtn = card.querySelector(".static");
    const buttonText = clickedElement.innerText.trim().toUpperCase();
    if (clickedElement.classList.contains("delete") || buttonText === "DELETE") {
        card.remove(); 
        updateCount();
        return;
    }
    if (clickedElement.classList.contains("interview") || buttonText === "INTERVIEW") {
        if (statusBtn) statusBtn.innerText = "INTERVIEWED";
        interviewContener.appendChild(card);
        updateCount();
    }
    else if (clickedElement.classList.contains("rejected") || buttonText === "REJECTED") {
        if (statusBtn) statusBtn.innerText = "REJECTED";
        rejectedContener.appendChild(card);
        updateCount();
    }
}

allContener.addEventListener('click', handleAction);
interviewContener.addEventListener('click', handleAction);
rejectedContener.addEventListener('click', handleAction);

updateCount();
switchTab(currentTab);