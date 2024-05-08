const portfolio = document.querySelector("#project");
let url = window.location.href;


async function renderProjectsToTheView(){
    try {
        let response = await fetch("../assets/json/projects.json");

        if (response.status === 200) {
            data = await response.text();
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }

        projects = JSON.parse(data);
        getProjectsData(projects);
    } catch (error) {
        console.log(error);
    }
}


const getProjectsData = (projects) => {
    let project = projects.filter ( proj => {return url.search(proj.name.toLowerCase()) > -1})[0];
    let index = projects.map( proj => proj.name).indexOf(project.name);
    let nextPrev = nextPreviousData(index, projects);
    let output = '';
    //console.log(nextPrev);
        if(project){
         output += `
        <div class="project">
            <picture class="project__cover-image">
                <source media="(min-width: 1110px)" srcset="../assets/images/detail/desktop/image-${project.name.toLowerCase()}-hero@2x.jpg">
                <source media="(min-width: 768px)" srcset="../assets/images/detail/tablet/image-${project.name.toLowerCase()}-hero@2x.jpg">
                <img src="../assets/images/detail/mobile/image-${project.name.toLowerCase()}-hero@2x.jpg" alt="${project.name}" >
            </picture>

            <div class="project__details">
                <div class="project__description border border--no-side">
                    <h1>${project.name}</h1>
                    <p>${project.description}</p>
                    <div class="interaction">
                        <p class="text-primary text-small"> Interaction Design / Front End Development </p>
                        <p class="text-primary text-small"> ${project.stack} </p>
                        <a class="btn btn-secondary" href="${project.website}" target="_blank"> Visit Website </a>
                    </div>
                </div>

                <div class="project__background">
                    <h2>Project Background</h2>
                    <p>${project.background}</p>
                    <div class="project__preview">
                        <h3>Static Preview</h3>
                        <picture class="project__preview-image">
                            <source media="(min-width: 1110px)" srcset="../assets/images/detail/desktop/image-${project.name.toLowerCase()}-preview-1@2x.jpg">
                            <source media="(min-width: 768px)" srcset="../assets/images/detail/tablet/image-${project.name.toLowerCase()}-preview-1@2x.jpg">
                            <img src="../assets/images/detail/mobile/image-${project.name.toLowerCase()}-preview-1@2x.jpg" alt="${project.name}">
                        </picture>
                        <picture class="project__preview-image">
                            <source media="(min-width: 1110px)" srcset="../assets/images/detail/desktop/image-${project.name.toLowerCase()}-preview-2@2x.jpg">
                            <source media="(min-width: 768px)" srcset="../assets/images/detail/tablet/image-${project.name.toLowerCase()}-preview-2@2x.jpg">
                            <img src="../assets/images/detail/mobile/image-${project.name.toLowerCase()}-preview-2@2x.jpg" alt="${project.name}">
                        </picture>
                    </div>
                </div>
            </div>
            
            

            <div class="links">
            <a  href="/projects/${nextPrev.previous.toLowerCase()}.html" class="link link--left border-right border border--no-side">
            <img src="../assets/images/icons/arrow-left.svg" alt="">
              <div class="link__texts">
                <h3>${nextPrev.previous}</h3>
                <p class="text-light">Previous Project</p>
              </div>
            </a>
            <a  href="/projects/${nextPrev.next.toLowerCase()}.html" class="link link--right border border--no-side">
            <img src="../assets/images/icons/arrow-right.svg" alt="">
              <div class="link__texts">
                <h3>${nextPrev.next}</h3>
                <p class="text-light">Next Project</p>
              </div>
            </a>
          </div>
        </div>
        `
           
        }else {
            console.log("Error: There is no such project");
        }
    portfolio.innerHTML = output;
}

const nextPreviousData = (index, projects) => {
    let name = {}
    if(index === 0) {
        name.previous = projects[projects.length - 1].name; 
        name.next = projects[1].name
    }else if( index === projects.length -1){
        name.previous = projects[index - 1].name; 
        name.next = projects[0].name
    }else {
        name.previous = projects[index - 1].name; 
        name.next = projects[index + 1].name
    }
    return name;
}



window.onload = () => {
    renderProjectsToTheView();
}


