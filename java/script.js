function adicionarEntrada() {
    // seu código...
}

function deletar(botao) {
    // seu código...
}

function atualizarTotal() {
    // seu código...
}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        const mensagem = document.getElementById("mensagemLogin");


        if (usuario === "unico" && senha === "2304") {

            // Salva que o usuário entrou
            localStorage.setItem("usuarioLogado", "true");

            // CAMINHO PARA O SISTEMA
            window.location.href = "index01.html";

        } else {

            mensagem.textContent = "Usuário ou senha incorretos.";
            mensagem.style.color = "red";

        }

    });

}

// ===============================
// PROTEGER O SISTEMA
// ===============================

if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/")
) {

    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado !== "true") {

        window.location.href = "index.html";

    }

}


// ===============================
// SAIR
// ===============================

function sair() {

    localStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";
}

// ===============================
// ADICIONAR ENTRADA
// ===============================

function adicionarEntrada() {

    const produto = document.getElementById("produto").value.trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    // Verificar os campos
    if (produto === "" || quantidade <= 0) {

        alert("Digite o produto e uma quantidade válida.");

        return;
    }


    // Pegar data e hora atual
    const agora = new Date();

    const hora = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const data = agora.toLocaleDateString("pt-BR");


    // Criar nova linha
    const tabela = document.getElementById("tabelaEntradas");

    const novaLinha = document.createElement("tr");


    novaLinha.innerHTML = `
        <td>${hora}</td>

        <td>${data}</td>

        <td class="num">
            ${quantidade}
        </td>

        <td>
            ${produto.toUpperCase()}
        </td>

        <td>
            <button 
                class="btn-deletar"
                onclick="deletar(this)"
            >
                Deletar
            </button>
        </td>
    `;


    // Adicionar na tabela
    tabela.appendChild(novaLinha);


    // Atualizar total
    atualizarTotal();


    // Limpar os campos
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";

}


// ===============================
// DELETAR PRODUTO
// ===============================

function deletar(botao) {

    const confirmar = confirm(
        "Deseja realmente excluir esta entrada?"
    );

    if (!confirmar) {
        return;
    }

    const linha = botao.closest("tr");

    linha.remove();

    atualizarTotal();

}


// ===============================
// ATUALIZAR TOTAL
// ===============================

function atualizarTotal() {

    const quantidades = document.querySelectorAll(
        "#tabelaEntradas .num"
    );

    let total = 0;


    quantidades.forEach(function(celula) {

        total += Number(celula.textContent);

    });


    document.getElementById("totalProdutos").textContent = total;

}