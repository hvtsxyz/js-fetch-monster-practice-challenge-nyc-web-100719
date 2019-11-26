document.addEventListener("DOMContentLoaded", ()=>{
    
    //Fetch API
    function fetchApi(){
        fetch("http://localhost:3000/monsters/?_limit=50").then(function(response){
            return response.json();
        })
        .then(function(json){
            parseData(json)
        });
    }
    fetchApi();

    let monsterContainer = document.getElementById("monster-container")
    console.log(monsterContainer)
    function parseData(data){
        data.forEach(monster => {addNewMonster(monster)})
    }

    function addNewMonster(monster){
        let div = document.createElement("div")
        

        div.innerHTML = `
        <h2>${monster.id} - ${monster.name} </h2>
        <p>${monster.age}</p>
        <p>${monster.description}</p>
        `


        monsterContainer.append(div)
    }

    function createMonsterForm(monster){
        let createMonster = document.getElementById("create-monster")
        console.log(createMonster)
        let formMonster = document.createElement("form")
        formMonster.innerHTML = `
        <input type="text" name="name" value="" placeholder="Name">
        <br>
        <input type="text" name="age" value="" placeholder="Age">
        <br>
        <input type="text-area" name="description" value="" placeholder="Description">
        <br>
        <input type="submit" name="submit" value="New Monster">
        `
        createMonster.append(formMonster)

        function persistMonster(newMonster){
            fetch(`http://localhost:3000/monsters/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(newMonster)
            })
            .then(res => res.json())
            .then(function(data) {addNewMonster(data)})
        }

        formMonster.addEventListener("submit", function(e){
            e.preventDefault();
            newMonster = {
                name: e.target[0].value,
                age: e.target[1].value,
                description: e.target[2].value 
            }
            persistMonster(newMonster, e)
            // persistMonster(name, age, description, e)
        })
    }
    createMonsterForm();


    
        

        




})