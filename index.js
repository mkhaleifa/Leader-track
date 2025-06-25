let myLeads =[]
const inputEl = document.getElementById('input-el')
const btnEl =document.getElementById('input-btn')
const ulEl =document.getElementById('ul-el')
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById('tab-btn')
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads =leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})


function render(Leads){
    let inputLead = ''
    for(let i=0 ; i <Leads.length ; i++){
        inputLead += `
            <li>
                <a target='_blank' href='${Leads[i]}'>
                    ${Leads[i]}
                </a>
            </li>
        `    }
    ulEl.innerHTML = inputLead
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads =[]
    render(myLeads)
})

btnEl.addEventListener('click', function(){
    myLeads.push(inputEl.value)
    inputEl.value=''

    localStorage.setItem('myleads',JSON.stringify(myLeads))
    render(myLeads)
})

