//DECLARAÇÃO CONSTANTE QUE ARMAZENA -> URL da API

const API_URL = "http://localhost:4000"

//Evento que carrega a página
document.addEventListener("DOMContentLoaded", () => {
    fetchArtigos()
    closeModal()
})
// Método para listar os artigos
async function  fetchArtigos (){
    const tabela = document.getElementById('resultado')
    try{
    const response = await fetch(`${API_URL}/artigos`)
    const artigos = await response.json()
    tabela.innerHTML= ""
    artigos.forEach(artigo => {
        const linha = document.createElement("tr")
        linha.innerHTML +=`
            <td>${artigo.id}</td>
            <td>${artigo.titulo}</td>
            <td>${artigo.conteudo}</td>
            <td>${artigo.autor}</td>
            <td>${artigo.criado}</td>
            <td><button class="btn btn-info" 
            onclick="abrirEditModal(${artigo.id},'${artigo.titulo}','${artigo.conteudo}',
            '${artigo.autor}')">
            Editar</button></td>
            <td><button class="btn btn-danger" onclick="excluirArtigo(${artigo.id})">
            Eliminar</button></td> `
        tabela.appendChild(linha)
        })
    } catch (erro){
        console.error(erro)
    }
}
// Método para adicionar artigos
async function addArtigos(){
    const titulo = document.getElementById('titulo').value
    const conteudo  = document.getElementById('conteudo').value
    const autor = document.getElementById('autor').value

    if (!titulo || !conteudo || !autor) return alert('Preencha os campos vazios')
    try {
    const response = await fetch(`${API_URL}/artigos`, {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ titulo, conteudo, autor })
        })
        fetchArtigos()
    } catch (erro) {    
        console.error("Erro de cadastro", erro)
    }
}
// Método para excluir artigos

async function excluirArtigo(id){
    if(!confirm('Tem certeza que deseja excluir este artigo?')) return
    try {
       await fetch(`${API_URL}/artigos/${id}`, {method:"DELETE"})
        fetchArtigos()
    } catch (error) {
        console.error("Erro ao excluir artigo", error)
    }
}
// Método para abrir modal de atualização
function abrirEditModal(id, titulo, conteudo,autor){
    document.getElementById('editId').value = id
    document.getElementById('editTitulo').value = titulo
    document.getElementById('editConteudo').value = conteudo
    document.getElementById('editAutor').value = autor

    document.getElementById('editModal').style.display = "flex"
}
// Método para fechar o modal
function closeModal() {
    document.getElementById('editModal').style.display = "none"
}
// Capturar os dados para atualizar
document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault()
    const id = document.getElementById('editId').value
    const titulo = document.getElementById('editTitulo').value 
    const conteudo  = document.getElementById('editConteudo').value 
    const autor = document.getElementById('editAutor').value

    try {
        await fetch(`${API_URL}/artigos/${id}`, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ titulo, conteudo, autor})
        })
        closeModal()
        fetchArtigos()
    } catch (error) {
        console.error("Erro ao editar artigo", error)
    }
})