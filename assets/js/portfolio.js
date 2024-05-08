
async function renderProjectsToTheView(width){
    let projects = {};
    let device = ""
    let response  = await fetch("../assets/json/projects.json");
    if(response.status === 200){
        data = await response.text()
    }else {
        console.log("Error", response.statusText)
    }
    projects = JSON.parse(data);
    device = checkDevice(width);
    getProjectsData(projects, device)
}

const getProjectsData = (projects, device) => {
    const portfolio = document.querySelector("#projects");
    let output = '';
    //console.log(device);
    for(let  project of projects){
         output += `
        <div class="project">
            <div class="project__image">
                <img src="../assets/images/portfolio/${device}/image-portfolio-${project.name.toLowerCase()}@2x.jpg" alt="${project.name}">
            </div>
            <div class="project__body">
                <h1>${project.name}</h1>
                <p>${project.description}</p>
                <a  href="/projects/${project.name.toLowerCase()}.html" class="btn btn-secondary">View Project</a>
            </div>
        </div>
        `
    }
    portfolio.innerHTML = output;
}

const checkDevice = (width) => {
    let device = "";
    if(width < 376){
        device = "mobile"
    }else if(width > 375 && width < 1150) {
            device = "tablet";
    }else if(width > 1151) {
        device = "desktop";
    }
    return device;
}

window.onload = () => {
    renderProjectsToTheView(window.innerWidth);
}
window.onresize = () => {
    renderProjectsToTheView(window.innerWidth);
}

