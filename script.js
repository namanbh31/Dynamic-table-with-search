const dataSource = "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
const sampleObj = {
    "id": 1,
    "first_name": "Chadwick",
    "last_name": "Ayre",
    "email": "cayre0@cam.ac.uk",
    "gender": "Male",
    "img_src": "https://robohash.org/corporisquiaperiam.png?size=50x50&set=set1",
    "class": 11,
    "marks": 18,
    "passing": false,
    "city": "Moorreesburg"
};
var table = document.getElementsByClassName("table-ini")[0];  
const tableDiv = document.getElementsByClassName("table-container")[0];
const azSortBtn = document.getElementById("az-sort");
const zaSortBtn = document.getElementById("za-sort");
const marksSortBtn = document.getElementById("marks-sort");
const passSortBtn = document.getElementById("pass-sort");
const classSortBtn = document.getElementById("class-sort");
const genderSortBtn = document.getElementById("gndr-sort");
const searchField = document.getElementById("search");
const searchBtn = document.getElementById("search-button");
let data =[];
async function details(){
    try{
        const data = await fetch(dataSource);
        if(!data){
            throw console.error("not loaded properly");
        }
        const result = await data.json();
        return result;
    }
    catch(err){
        console.log("refresh");
    }
    
}
async function initialPopulate(){
    data = await details()
    let counter  =1; 
    data.forEach(student => {
        student.full_name = student.first_name+" "+student.last_name;
        const newData = `            
            <tr>
                <td class="table-id">${counter++}</td>
                <td class="table-name-common">
                    <!-- pp=profile photo -->
                    <div class="pp-div">
                        <img src="${student.img_src}" alt="" class="pp">
                        <div class="name">
                            ${student.full_name}
                        </div>
                    </div>
                </td>
                <td class="table-common">${student.gender}</td>
                <td class="table-common">${student.class}</td>
                <td class="table-common">${student.marks}</td>
                <td class="table-common">${student.passing?"Passing":"Failed"}</td>
                <td class="table-common">${student.email}</td>
            </tr>
            `;
        table.insertAdjacentHTML("beforeend", newData);
    });
    
}
function populateAfterSorting(data){
    tableDiv.innerHTML="";
    // tableDiv.insertAdjacentHTML("beforeend", value);
    // table.innerHTML = "";    
    let counter=1; 
    const tableHeading = `    
    <table class="data-table table-font table-ini">        
                <tr id="heading">
                <td class="table-id">ID</td>
                <td class="table-name">Name</td>
                <td class="table-common">Gender</td>
                <td class="table-common">Class</td>
                <td class="table-common">Marks</td>
                <td class="table-common">Passing</td>
                <td class="table-common">Email</td>
            </tr>
            </table>`;
    tableDiv.insertAdjacentHTML("beforeend", tableHeading); 
    let table1 = document.getElementsByClassName("table-ini")[0];  
    data.forEach(student => {
        const newData = `            
            <tr class="data-row">
                <td class="table-id">${counter++}</td>
                <td class="table-name-common">
                    <!-- pp=profile photo -->
                    <div class="pp-div">
                        <img src="${student.img_src}" alt="" class="pp">
                        <div class="name">
                            ${student.full_name}
                        </div>
                    </div>
                </td>
                <td class="table-common">${student.gender}</td>
                <td class="table-common">${student.class}</td>
                <td class="table-common">${student.marks}</td>
                <td class="table-common">${student.passing?"Passing":"Failed"}</td>
                <td class="table-common">${student.email}</td>
            </tr>
            `
    table1.insertAdjacentHTML("beforeend", newData);
    });
    
}

// Gender Sort 

function genderSort(){
    let result =  {males:[], females:[]};
    data.forEach((s)=>{
        if(s.gender == "Male"){
            result.males.push(s);
        }
        if (s.gender == "Female"){
            result.females.push(s);
        }
        
    });
    // console.log(result);
    return result;
}

// gender table population

function genderPopulate(data){
    tableDiv.innerHTML="";
    let counter=1; 
    const maleTableHTML = `
    <h1>Males</h1>
                <table  id="male-table" class="data-table table-font" >
            <tr id="heading">
                <td class="table-id">ID</td>
                <td class="table-name">Name</td>
                <td class="table-common">Gender</td>
                <td class="table-common">Class</td>
                <td class="table-common">Marks</td>
                <td class="table-common">Passing</td>
                <td class="table-common">Email</td>
            </tr>

        </table>
    `;
    tableDiv.insertAdjacentHTML("beforeend", maleTableHTML);
    const maleTable = document.getElementById('male-table');
    data.males.forEach(student => {
        const newData = `            
            <tr class="data-row">
                <td class="table-id">${counter++}</td>
                <td class="table-name-common">
                    <!-- pp=profile photo -->
                    <div class="pp-div">
                        <img src="${student.img_src}" alt="" class="pp">
                        <div class="name">
                            ${student.full_name}
                        </div>
                    </div>
                </td>
                <td class="table-common">${student.gender}</td>
                <td class="table-common">${student.class}</td>
                <td class="table-common">${student.marks}</td>
                <td class="table-common">${student.passing?"Passing":"Failed"}</td>
                <td class="table-common">${student.email}</td>
            </tr>
            `;
    maleTable.insertAdjacentHTML("beforeend", newData)});

    

    counter = 1;
    const femaleTableHTML = `
        <h1>Females</h1>
            <div class="table-container table-font">
                <table  id="female-table" class="data-table table-font" >
            <tr id="heading">
                <td class="table-id">ID</td>
                <td class="table-name">Name</td>
                <td class="table-common">Gender</td>
                <td class="table-common">Class</td>
                <td class="table-common">Marks</td>
                <td class="table-common">Passing</td>
                <td class="table-common">Email</td>
            </tr>

        </table>
        </div>
    `;
    tableDiv.insertAdjacentHTML("beforeend", femaleTableHTML);
    const femaleTable = document.getElementById('female-table')
    data.females.forEach(student => {
        const newData = `            
            <tr class="data-row">
                <td class="table-id">${counter++}</td>
                <td class="table-name-common">
                    <!-- pp=profile photo -->
                    <div class="pp-div">
                        <img src="${student.img_src}" alt="" class="pp">
                        <div class="name">
                            ${student.full_name}
                        </div>
                    </div>
                </td>
                <td class="table-common">${student.gender}</td>
                <td class="table-common">${student.class}</td>
                <td class="table-common">${student.marks}</td>
                <td class="table-common">${student.passing?"Passing":"Failed"}</td>
                <td class="table-common">${student.email}</td>
            </tr>
            `;
    femaleTable.insertAdjacentHTML("beforeend", newData)});



    
    
}

// populating the table initially

// search funciton

function search(value){
    value = value.toString().toLowerCase();

    const newData = data.filter((s)=>{
        s.full_name = s.full_name.toString().toLowerCase();
        if(s.full_name.includes(value)){
            return s;
        }
        else if(s.email.includes(value)){
            return s;
        }
    });
    return newData;
}

initialPopulate();
azSortBtn.addEventListener("click", ()=>{
    // 
    const sortedData = data.sort((a, b)=>a.full_name.localeCompare(b.full_name));
    table.innerHTML = "";
    populateAfterSorting(sortedData);
});

zaSortBtn.addEventListener("click", ()=>{
    // 
    const sortedData = data.sort((a, b)=>b.full_name.localeCompare(a.full_name));
    table.innerHTML = "";
    populateAfterSorting(sortedData);
});

marksSortBtn.addEventListener("click", ()=>{
    // 
    const sortedData = data.sort((a, b)=>a.marks-b.marks);
    table.innerHTML = "";
    populateAfterSorting(sortedData);
});

passSortBtn.addEventListener("click", ()=>{
    // 
    const sortedData = data.filter(s=> s.passing);
    table.innerHTML = "";
    populateAfterSorting(sortedData);
});

classSortBtn.addEventListener("click", ()=>{
    // 
    const sortedData = data.sort((a, b)=>a.class - b.class);
    table.innerHTML = "";
    populateAfterSorting(sortedData);
});

genderSortBtn.addEventListener("click", ()=>{
    const sortedData = genderSort();
    genderPopulate(sortedData)

});     


searchField.addEventListener("change", (e)=>{
    const searchedValues = search(e.target.value);
    // 
    populateAfterSorting(searchedValues);

})