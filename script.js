document.addEventListener('DOMContentLoaded', function() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');

    // Função para carregar estados da API
    function loadStates() {
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            .then(response => response.json())
            .then(data => {
                data.forEach(state => {
                    let option = document.createElement('option');
                    option.value = state.sigla;
                    option.textContent = state.nome;
                    estadoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar estados:', error));
    }

    // Função para carregar cidades com base no estado selecionado
    window.populateCities = function() {
        cidadeSelect.innerHTML = '<option value="">Selecione a Cidade</option>'; // Reseta a lista de cidades

        const selectedEstado = estadoSelect.value;
        if (selectedEstado) {
            fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${selectedEstado}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(city => {
                        let option = document.createElement('option');
                        option.value = city.nome;
                        option.textContent = city.nome;
                        cidadeSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Erro ao carregar cidades:', error));
        }
    };

    // Carrega os estados ao inicializar a página
    loadStates();
});
