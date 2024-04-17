function proximoForm() {
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
  }
  
  let ordemServico = {
    osSelected: {},
    itemsOs: []
  };
  
  function adicionarItem() {
    let codigo = document.getElementById('codigo').value;
    let descricao = document.getElementById('descricao_produto').value;
    let quantidade = document.getElementById('quantidade').value;
  
    if (codigo.trim() !== '' && descricao.trim() !== '' && quantidade.trim() !== '') {
      // Adiciona o item ao array de itens da ordem de serviço
      ordemServico.itemsOs.push({ codigo, descricao, prod_qtd: quantidade });
  
      // Atualiza o localStorage com os dados da ordem de serviço
      localStorage.setItem('ordemServico', JSON.stringify(ordemServico));
  
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
  
  function removerItem(index) {
    // Remove o item do array de itens da ordem de serviço
    ordemServico.itemsOs.splice(index, 1);
  
    // Atualiza o localStorage com os dados da ordem de serviço
    localStorage.setItem('ordemServico', JSON.stringify(ordemServico));
  
    // Atualiza a tabela
    atualizarTabela();
  }
  
  function atualizarTabela() {
    let tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = '';
  
    ordemServico.itemsOs.forEach((item, index) => {
      let row = tabelaCorpo.insertRow();
      let codigoCell = row.insertCell(0);
      let descricaoCell = row.insertCell(1);
      let quantidadeCell = row.insertCell(2);
      let acaoCell = row.insertCell(3);
  
      codigoCell.innerHTML = item.codigo;
      descricaoCell.innerHTML = item.descricao;
      quantidadeCell.innerHTML = item.prod_qtd;
      acaoCell.innerHTML = `<button class="btn-excluir" onclick="removerItem(${index})">Excluir</button>`;
    });
  
    // Exibe a tabela
    document.getElementById('tabelaProdutos').style.display = 'table';
  }
  
  // Verifica se há uma ordem de serviço armazenada no localStorage
  if (localStorage.getItem('ordemServico')) {
    // Se houver, carrega os dados da ordem de serviço
    ordemServico = JSON.parse(localStorage.getItem('ordemServico'));
    // Atualiza a tabela com os itens
    atualizarTabela();
  }
  