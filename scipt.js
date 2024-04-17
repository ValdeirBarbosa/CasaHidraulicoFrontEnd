let ordensServico = [];


// Função para salvar a ordem de serviço no localStorage
function salvarOrdemServico() {
  localStorage.setItem('ordensServico', JSON.stringify(ordensServico));
}

// Função para carregar as ordens de serviço salvas do localStorage
function carregarOrdensServico() {
  const ordensServicoSalvas = localStorage.getItem('ordensServico');
  if (ordensServicoSalvas) {
    ordensServico = JSON.parse(ordensServicoSalvas);
  }
}

// Função para adicionar um novo item à ordem de serviço
function adicionarItem() {
  let codigo = document.getElementById('codigo').value;
  let descricao = document.getElementById('descricao_produto').value;
  let quantidade = document.getElementById('quantidade').value;

  if (codigo.trim() !== '' && descricao.trim() !== '' && quantidade.trim() !== '') {
    // Adiciona o item à ordem de serviço atual
    ordensServico.push({ codigo, descricao, prod_qtd: quantidade });

    // Salva a ordem de serviço no localStorage
    salvarOrdemServico();

    // Limpa os campos do formulário
    document.getElementById('codigo').value = '';
    document.getElementById('descricao_produto').value = '';
    document.getElementById('quantidade').value = '';

    // Atualiza a tabela
    atualizarTabela();
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}

// Função para remover um item da ordem de serviço
function removerItem(index) {
  // Remove o item do array de itens da ordem de serviço
  ordensServico.splice(index, 1);

  // Salva a ordem de serviço atualizada no localStorage
  salvarOrdemServico();

  // Atualiza a tabela
  atualizarTabela();
}

// Função para atualizar a tabela de itens da ordem de serviço
function atualizarTabela() {
  let tabelaCorpo = document.getElementById('ordemServico');
  tabelaCorpo.innerHTML = '';

  ordensServico.forEach((item, index) => {
    let row = tabelaCorpo.insertRow();
    let codigoCell = row.insertCell(0);
    let descricaoCell = row.insertCell(1);
    let quantidadeCell = row.insertCell(2);
    let acaoCell = row.insertCell(3);

    codigoCell.textContent = item.codigo;
    descricaoCell.textContent = item.descricao;
    quantidadeCell.textContent = item.prod_qtd;
    acaoCell.innerHTML = `<button class="btn-excluir" onclick="removerItem(${index})">Excluir</button>`;
  });

  // Exibe a tabela
  document.getElementById('tabelaProdutos').style.display = 'table';
}

// Carrega as ordens de serviço salvas ao carregar a página
carregarOrdensServico();
// Atualiza a tabela com as ordens de serviço carregadas
atualizarTabela();
