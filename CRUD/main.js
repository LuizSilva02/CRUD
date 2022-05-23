'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal')
    .classList.remove('active')
    
}

const getLocalStorage =  () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client",JSON.stringify(dbClient))


const deleteClient = (index) =>{
    const dbClient = readClient()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}

const updateClient = (client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
} 


const readClient =  () => getLocalStorage()


const createCliente = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient) 
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}


const clearFields = () =>{
    const fileds = document.querySelectorAll('.modal-field')
    fileds.forEach(field => field.value = "")
}


const saveClient = () => {
    if (isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        createCliente(client)
        closeModal()
    } 
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}       
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green">editar</button>
        <button type="button" class="button red">excluir</button>
    </td>
    `
    document.querySelector('#tabClient>body').appendChild(newRow)
}


const updateTable = () => {
  const dbClient = readClient()
  dbClient.forEach(createRow)
}

updateTable()


document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('Salvar')
.addEventListener('click', saveClient)