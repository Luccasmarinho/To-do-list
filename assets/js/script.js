const inputText = document.querySelector(".input-text");
const btnDelete = document.querySelectorAll(".btn-delete");
const form = document.querySelector(".form");

const listaTarefas = JSON.parse(localStorage.getItem("tarefa")) || []

function carregarTasks() {
    listaTarefas.forEach((tarefa) => {
        criarTask(tarefa)
    })
}

carregarTasks()

form.addEventListener("submit", (event) => {
    event.preventDefault()
    // validacaoErro()

    if (inputText.value == "") {
        document.querySelector("#erro-hidden").style.display = "block"
        document.querySelector(".input-text").style.border = "1px solid #F40001ed"
        return
    } else {
        document.querySelector("#erro-hidden").style.display = "none"
        document.querySelector(".input-text").style.border = "1px solid #845AFC"
    }

    guardaDados(inputText.value)
    criarTask()
})

function guardaDados(valorInput) {
    listaTarefas.push(valorInput)
    localStorage.setItem("tarefa", JSON.stringify(listaTarefas))
}

function removeDados(tag) {
    const indice = listaTarefas.indexOf(tag.textContent)
    listaTarefas.splice(indice, 1)
    localStorage.setItem("tarefa", JSON.stringify(listaTarefas))
}

function criarTask(tarefa = inputText.value) {
    const li = document.createElement("li");
    li.classList.add("container-tasks__tasks")
    document.querySelector(".container-tasks").appendChild(li)
    
    const p = document.createElement("p");
    p.classList.add("text-tasks")
    p.innerHTML = `${tarefa}`
    li.appendChild(p)

    const button = document.createElement("button");
    button.classList.add("btn-delete")
    li.appendChild(button)
    
    const i = document.createElement("i")
    i.classList.add("fa-solid")
    i.classList.add("fa-trash")
    button.appendChild(i)
    
    button.onclick = () => {
        li.remove()
        removeDados(p)
    }

    return li
}



