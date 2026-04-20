const loadIssues = async () => {
    const allIssuesUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(allIssuesUrl);
    const issuesJson = await res.json();
    displayIssues(issuesJson.data);
    // console.log(issuesJson.data);
    // console.log("Total Issues", issuesJson.data.length);
    const totalIssuesElm = document.getElementById("total-issues");
    totalIssuesElm.innerText = issuesJson.data.length;
}
loadIssues();

const getLabelClass = (label) => {
    switch (label) {
        case "enhancement":
            return "bg-[#DEFCE8]] text-[#00A96E] border border-[#BBF7D0]";
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




const displayIssues = (issues) => {
    // console.log(issues);
    // console.log("Total Issues", issues.length);
    const issueContainerParent = document.getElementById("issues-card-container");

    issues.forEach(issue => {
        // console.log(issue.id);
        // console.log(issue.title);
        let issueCard = document.createElement("div");
        const dateFormat = new Date(issue.createdAt).toLocaleDateString("en-US");
        issueCard.classList.add("space-y-[2px]", "bg-white", "drop-shadow-md", "rounded-md");
        const labelsHtml = issue.labels
            .filter(label => label && label !== "undefined")
            .map(label => {
                return `
            <span id="issue-label"
                                class="w-20 items-center text-xs font-medium whitespace-nowrap w-fit text-center p-1.5 rounded-full uppercase ${getLabelClass(label)}"><i
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
                                class="w-20 items-center text-center text-xs font-medium bg-[#FEECEC] text-[#EF4444] p-1.5 rounded-full uppercase">${issue.priority}</span>
                        </div>
                        <div class="title-desc p-4">
                            <h2 id="issue-title" class="text-sm font-semibold text-[#1F2937]">${issue.title}</h2>
                            <p id="issue-desc" class="text-xs text-[#64748B] mt-2">${issue.description}</p>
                        </div>
                        <div class="labels p-4 flex flex-wrap gap-1">
                            ${labelsHtml}
                        </div>
                        <div class="author-info-box border-t border-t-[#E4E4E7]">
                            <div class="autho-info p-4">
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

}   
