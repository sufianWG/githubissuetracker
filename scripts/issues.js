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



const displayIssues = (issues) => {
    // console.log(issues);
    // console.log("Total Issues", issues.length);
    const issueContainerParent = document.getElementById("issues-card-container");
    issues.forEach(issue => {
        // console.log(issue.id);
        // console.log(issue.title);
        let issueCard = document.createElement("div");
        const dateFormat = new Date (issue.createdAt).toLocaleDateString("en-US");
        issueCard.classList.add("space-y-0.5", "bg-white", "drop-shadow-md", "rounded-md");
        issueCard.innerHTML = `
            <div class="status-priority p-4 flex justify-between">
                            <div class="open-status">
                                <img src="./assets/Open-Status.png" alt="">
                            </div>
                            <div class="closed-status hidden">
                                <img src="./assets/Closed- Status .png" alt="">
                            </div>

                            <span id="priority-status"
                                class="w-20 items-center text-center text-xs font-medium bg-[#FEECEC] text-[#EF4444] p-1.5 rounded-full uppercase">${issue.priority}</span>
                        </div>
                        <div class="title-desc p-4">
                            <h2 id="issue-title" class="text-sm font-semibold text-[#1F2937]">${issue.title}</h2>
                            <p id="issue-desc" class="text-xs text-[#64748B] mt-2">${issue.description}</p>
                        </div>
                        <div class="labels p-4">
                            <span id="issue-label-bug"
                                class="w-20 items-center text-xs font-medium text-center bg-[#FEECEC] text-[#EF4444] border border-[#FECACA] p-1.5 rounded-full uppercase"><i
                                    class="fa-solid fa-bug"></i> ${issue.labels[0]}</span>
                            <span id="issue-label-help"
                                class="w-20 items-center text-xs font-medium text-center bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A] p-1.5 rounded-full uppercase"><i
                                    class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</span>
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
