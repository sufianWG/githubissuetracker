const totalIssuesElm = document.getElementById("total-issues");

const loadAllIssues = async () => {
    const allIssuesUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(allIssuesUrl);
    const issuesJson = await res.json();
    displayIssues(issuesJson.data);
    // console.log(issuesJson.data);
    // console.log("Total Issues", issuesJson.data.length);
    totalIssuesElm.innerText = issuesJson.data.length;
}
loadAllIssues();



const getLabelClass = (label) => {
    switch (label) {
        case "enhancement":
            return "bg-[#DEFCE8] text-[#00A96E] border border-[#BBF7D0]";
        case "bug":
            return "bg-[#FEECEC] text-[#EF4444] border border-[#FECACA]";
        case "help wanted":
            return "bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A]";
        case "good first issue":
            return "bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]";
        case "documentation":
            return "bg-[#F3E8FF] text-[#7C3AED] border border-[#DDD6FE]";
        default:
            return "bg-gray-100 text-gray-600";
    }
}
const getLabelIcon = (label) => {
    switch (label) {
        case "enhancement":
            return "fa-solid fa-arrow-up-right-dots";
        case "bug":
            return "fa-solid fa-bug";
        case "help wanted":
            return "fa-solid fa-life-ring";
        case "good first issue":
            return "fa-solid fa-thumbs-up";
        case "documentation":
            return "fa-brands fa-readme";
        case "undefined":
            return "";
        default:
            return "";
    }
}

const getStatusIcon = (statustext) => {
    switch (statustext) {
        case "open":
            return `<img src="./assets/Open-Status.png" alt="">`;
        case "closed":
            return `<img src="./assets/Closed-Status.png" alt="">`;
        default:
            return "";
    }
}

const getPriorityBg = (priority) => {
    switch (priority) {
        case "low":
            return `bg-[#EEEFF2] text-[#9CA3AF]`;
        case "medium":
            return `bg-[#FFF6D1] text-[#F59E0B]`;
        case "high":
            return `bg-[#FEECEC] text-[#EF4444]`;
        default:
            return "";
    }
}

const displayIssues = (issues) => {
    // console.log(issues);
    // console.log("Total Issues", issues.length);
    const issueContainerParent = document.getElementById("issues-card-container");
    issueContainerParent.innerHTML = "";
    // totalIssuesElm.innerText
    let motIssue = 0;

    issues.forEach(issue => {
        // console.log(issue.id);
        // console.log(issue.title);
        motIssue++
        let issueCard = document.createElement("div");
        const dateFormat = new Date(issue.createdAt).toLocaleDateString("en-US");
        issueCard.classList.add("space-y-1.5", "bg-white", "drop-shadow-md", "rounded-md", "border-t-3");
        let issueStatus = `${issue.status}`;
        if (issueStatus == "open") {
            issueCard.classList.add("border-[#00A96E]");
        } else {
            issueCard.classList.add("border-[#A855F7]");
        }
        const labelsHtml = issue.labels
            .filter(label => label && label !== "undefined")
            .map(label => {
                return `
            <span class="w-20 items-center text-xs font-medium whitespace-nowrap w-fit text-center p-1.5 rounded-full uppercase ${getLabelClass(label)}"><i
                                    class="${getLabelIcon(label)}"></i> ${label}
                                    </span>
        `;
            }).join("");
        issueCard.innerHTML = `
            <div class="status-priority p-4 flex justify-between">
                            <div class="issue-status">
                                ${getStatusIcon(issue.status)}
                            </div>

                            <span id="priority-status"
                                class="w-20 items-center text-center text-xs font-medium ${getPriorityBg(issue.priority)} p-1.5 rounded-full uppercase">${issue.priority}</span>
                        </div>
                        <div class="title-desc px-4">
                            <h2 id="issue-title" class="text-sm font-semibold text-[#1F2937]">${issue.title}</h2>
                            <p id="issue-desc" class="text-xs text-[#64748B] mt-2">${issue.description}</p>
                        </div>
                        <div class="labels px-4 flex flex-wrap gap-1">
                            ${labelsHtml}
                        </div>
                        <div class="author-info-box border-t border-t-[#E4E4E7]">
                            <div class="autho-info px-4">
                                <p class="text-[#64748B] text-xs">#<span id="author-id">${issue.id} </span>by <span
                                        id="author-name">${issue.author}</span></p>
                                <p class="date text-[#64748B] text-xs">${dateFormat}</p>
                            </div>
                        </div>
        `
        // issueContainerParent.innerHTML = `
        // <div class="issue-card space-y-0.5 bg-white drop-shadow-md rounded-md">

        //             </div>
        // `


        issueContainerParent.append(issueCard);
    });
    totalIssuesElm.innerText = motIssue;
    spinner(false);
}
// all-btn click korleo jeno sob issue dekhay
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", () => {
    toggle("all-btn");
    const loadIssues = async () => {
        spinner(true);
        const allIssuesUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
        const res = await fetch(allIssuesUrl);
        const issuesJson = await res.json();
        displayIssues(issuesJson.data);
        // console.log(issuesJson.data);
        // console.log("Total Issues", issuesJson.data.length);
        // totalIssuesElm.innerText = issuesJson.data.length;
    }
    loadIssues();
})

// ekhon sudhu "open" status er issue gulo show koracchi
const openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", () => {
    toggle("open-btn");
    // console.log("clicked on open button");
    // load issues again for to filter open status issues
    const loadIssues = async () => {
        spinner(true);
        const allIssuesUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
        const res = await fetch(allIssuesUrl);
        const issuesJson = await res.json();
        let allIssues = issuesJson.data;
        // console.log(allIssues);
        // console.log(issuesJson.data);
        // console.log("Total Issues", issuesJson.data.length);
        const filterOpenIssue = allIssues.filter(issue => issue.status == "open");
        // console.log(filterOpenIssue);
        displayIssues(filterOpenIssue);
    }
    loadIssues();
})

// ekhon sudhu "open" status er issue gulo show koracchi
const closeBtn = document.getElementById("closed-btn");
closeBtn.addEventListener("click", () => {
    toggle("closed-btn");
    // console.log("clicked on open button");
    // load issues again for to filter open status issues
    const loadIssues = async () => {
        spinner(true);
        const allIssuesUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
        const res = await fetch(allIssuesUrl);
        const issuesJson = await res.json();
        let allIssues = issuesJson.data;
        // console.log(allIssues);
        // console.log(issuesJson.data);
        // console.log("Total Issues", issuesJson.data.length);
        const filterClosedIssue = allIssues.filter(issue => issue.status == "closed");
        // console.log(filterOpenIssue);
        displayIssues(filterClosedIssue);
    }
    loadIssues();
})

// toogling handle korar jonno 
const toggle = (id) =>  {
    document.getElementById("all-btn").classList.remove("bg-[#4A00FF]", "text-white");
    document.getElementById("all-btn").classList.add("bg-white", "text-[#64748B]", "outline-1", "outline-[#E4E4E7]");
    document.getElementById("open-btn").classList.remove("bg-[#4A00FF]", "text-white");
    document.getElementById("open-btn").classList.add("bg-white", "text-[#64748B]", "outline-1", "outline-[#E4E4E7]");
    document.getElementById("closed-btn").classList.remove("bg-[#4A00FF]", "text-white");
    document.getElementById("closed-btn").classList.add("bg-white", "text-[#64748B]", "outline-1", "outline-[#E4E4E7]");

    
    // ekhon conditionally button color change korrar jonno
    document.getElementById(id).classList.add("bg-[#4A00FF]", "text-white");
    document.getElementById(id).classList.remove("bg-white", "text-[#64748B]", "outline-1", "outline-[#E4E4E7]");

}

// spinner dekhanor funciton
const spinner = (obostha) => {
    const spinnerDiv = document.querySelector(".spinner-loading");
    if(obostha == true) {
        spinnerDiv.classList.remove('hidden');
    }else{
        spinnerDiv.classList.add('hidden');
    }
}