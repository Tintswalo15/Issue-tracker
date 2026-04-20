function getIssues() {
    return JSON.parse(localStorage.getItem("issues")) || [];
}

function saveIssues(issues) {
    localStorage.setItem("issues", JSON.stringify(issues));
}

function handleCreate() {
    let issue = {
        id: Date.now(),
        summary: document.getElementById("summary").value,
        description: document.getElementById("description").value,
        reporter: document.getElementById("reporter").value,
        dateCreated: new Date().toISOString().split("T")[0],
        project: document.getElementById("project").value,
        //assignedTo: document.getElementById("assignedTo").value,
        status: "open",
        priority: document.getElementById("priority").value,
        targetDate: document.getElementById("targetDate").value,
        resolvedDate: "",
        resolution: ""
    };
    console.log(issue);
    if (!validateIssue(issue)) return;

    let issues = getIssues();
    issues.push(issue);
    saveIssues(issues);

    alert("Issue created!");
    window.location.href = "index.html";
}

function validateIssue(issue) {
    if (
        !issue.summary ||
        !issue.description ||
        !issue.reporter ||
        !issue.project ||
        !issue.priority ||
        !issue.targetDate
    ) {
        alert("Fill in all required fields!");
        return false;
    }
    return true;

}

function displayIssues() {
    let issues = getIssues();
    let container = document.getElementById("issuesList");

    container.innerHTML = "";

    issues.forEach(issue =>{
        container.innerHTML += `
        <div>wei
            <h3>${issue.summary}</h3>
            <p>Staus: ${issue.status}</p>
            <p>Priority: ${issue.priority}</p>
            <button onclick="viewIssue(${issue.id})">View</button>
        </div>
        <hr>
        `;
    });
}

function viewIssue(id) {
    localStorage.setItem("selectedIssue", id);
    window.location.href = "view.html";
}

function loadIssue() {
    let id = localStorage.getItem("selectedIssue");
    let issue = getIssues().find(i => i.id == id);

    let container = document.getElementById("issueDetails");

    container.innerHTML = `
        <h2>${issue.summary}</h2>
        <p>${issue.description}</p>
        <p>Reporter: ${issue.reporter}</p>
        <p>Status: ${issue.status}</p>
        <p>Priority: ${issue.priority}</p>
        <p>Target Date: ${issue.targetDate}</p>

        <textarea id="resolutionText" placeholder="Resolution"></textarea><br>
        <button onclick="resolveIssue(${issue.id})">Mark as Resolved</button>
   
    `;

}

function resolveIssue(id) {
    let issues = getIssues();

    issues = issues.map(issue => {
       if (issue.id == id){
        issue.status = "resolved";
        issue.resolvedDate = new Date().toISOString().split("T")[0];
        issue.resolution = document.getElementById("resolutionText").value;
       }
       return issue;
    });

    saveIssues(issues);
    alert("issue resolved!");
    window.location.href = "index.html";
} 