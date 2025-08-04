// index.js
document.addEventListener('DOMContentLoaded', () => {
  // 1. Contador regressivo (promoção)
  function iniciarContador() {
    let horas = 1;
    let minutos = 0;
    let segundos = 0;

    const horasEl = document.getElementById('hours');
    const minutosEl = document.getElementById('minutes');
    const segundosEl = document.getElementById('seconds');

    function atualizarContador() {
      if (segundos === 0) {
        if (minutos === 0) {
          if (horas === 0) return;
          horas--;
          minutos = 59;
        } else {
          minutos--;
        }
        segundos = 59;
      } else {
        segundos--;
      }

      horasEl.textContent = String(horas).padStart(2, '0');
      minutosEl.textContent = String(minutos).padStart(2, '0');
      segundosEl.textContent = String(segundos).padStart(2, '0');
    }

    setInterval(atualizarContador, 1000);
  }

  // 2. Produtos fictícios
  const produtos = [
    {
      nome: "Camiseta Oversized Preta",
      preco: 89.90,
      precoOriginal: 119.90,
      tamanhos: ["P", "M", "G", "GG"],
      imagem: "https://via.placeholder.com/300x300?text=Preta",
      cor: "preto"
    },
    {
      nome: "Camiseta Oversized Branca",
      preco: 89.90,
      precoOriginal: 109.90,
      tamanhos: ["M", "G", "G1"],
      imagem: "https://via.placeholder.com/300x300?text=Branca",
      cor: "branco"
    },
    {
      nome: "Camiseta Oversized Verde",
      preco: 89.90,
      precoOriginal: 119.90,
      tamanhos: ["G", "GG", "G2"],
      imagem: "https://via.placeholder.com/300x300?text=Verde",
      cor: "verde"
    }
  ];

  const grid = document.getElementById('products-grid');

  function exibirProdutos(lista) {
    grid.innerHTML = '';
    lista.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image">
          <img src="${produto.imagem}" alt="${produto.nome}">
          <span class="discount-badge">-25%</span>
          <div class="product-sizes">
            ${produto.tamanhos.map(t => `<span class="size-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${produto.nome}</h3>
          <div class="product-rating">
            <span class="stars">⭐⭐⭐⭐☆</span>
            <span class="rating-count">(132)</span>
          </div>
          <div class="product-pricing">
            <div class="old-price">R$ ${produto.precoOriginal.toFixed(2)}</div>
            <div class="current-price">R$ ${produto.preco.toFixed(2)}</div>
            <div class="installments">ou 3x de R$ ${(produto.preco / 3).toFixed(2)}</div>
          </div>
          <div class="cashback">💰 Cashback de R$ 5,00</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  exibirProdutos(produtos);

  // 3. Filtros
  const filtroCountEl = document.querySelector('.filter-count');
  const clearBtn = document.querySelector('.clear-filters');

  function atualizarContagemFiltros() {
    const filtrosSelecionados = document.querySelectorAll('.filters-sidebar input:checked');
    filtroCountEl.textContent = filtrosSelecionados.length;
  }

  function aplicarFiltrosCombinados() {
    const tamanhosSelecionados = [...document.querySelectorAll('.size-options input:checked')].map(cb => cb.value);
    const coresSelecionadas = [...document.querySelectorAll('.color-options input:checked')].map(cb => cb.value);

    const min = parseFloat(rangeMin.value);
    const max = parseFloat(rangeMax.value);

    labelMin.textContent = min;
    labelMax.textContent = max;

    const filtrados = produtos.filter(produto => {
      const matchTamanho = tamanhosSelecionados.length === 0 || produto.tamanhos.some(t => tamanhosSelecionados.includes(t));
      const matchCor = coresSelecionadas.length === 0 || coresSelecionadas.includes(produto.cor);
      const matchPreco = produto.preco >= min && produto.preco <= max;

      return matchTamanho && matchCor && matchPreco;
    });

    exibirProdutos(filtrados);
    atualizarContagemFiltros();
  }

  document.querySelectorAll('.filters-sidebar input').forEach(input => {
    input.addEventListener('change', aplicarFiltrosCombinados);
  });

  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.filters-sidebar input').forEach(input => input.checked = false);
    rangeMin.value = 0;
    rangeMax.value = 200;
    labelMin.textContent = '0';
    labelMax.textContent = '200';
    exibirProdutos(produtos);
    atualizarContagemFiltros();
  });

  // 4. Campo de pesquisa
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  searchBtn.addEventListener('click', () => {
    const termo = searchInput.value.toLowerCase();
    const resultado = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    exibirProdutos(resultado);
  });

  // 5. Filtro por preço com sliders
  const rangeMin = document.getElementById('price-min-range');
  const rangeMax = document.getElementById('price-max-range');
  const labelMin = document.getElementById('price-min-label');
  const labelMax = document.getElementById('price-max-label');

  rangeMin.addEventListener('input', aplicarFiltrosCombinados);
  rangeMax.addEventListener('input', aplicarFiltrosCombinados);

  // 6. Iniciar contador
  iniciarContador();
});
