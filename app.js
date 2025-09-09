import { AbrigoAnimais } from './src/abrigo-animais.js'

// Instancia a classe principal do desafio
const abrigo = new AbrigoAnimais()

// Pega os dados dos animais e brinquedos diretamente da instância
const todosOsAnimais = Object.keys( abrigo.animaisDB )
const todosOsBrinquedos = Array.from( abrigo.validator.brinquedosValidos )

// --- Elementos do DOM ---
const brinquedosP1Div = document.getElementById( 'brinquedos-p1' )
const brinquedosP2Div = document.getElementById( 'brinquedos-p2' )
const animaisDiv = document.getElementById( 'animais-disponiveis' )
const verificarBtn = document.getElementById( 'verificar-btn' )
const resultadosDiv = document.getElementById( 'resultados' )

// --- Funções Auxiliares ---

// Função para criar checkboxes dinamicamente
function criarCheckboxes ( container, items, name ) {
    items.forEach( item => {
        const label = document.createElement( 'label' )
        const checkbox = document.createElement( 'input' )
        checkbox.type = 'checkbox'
        checkbox.name = name
        checkbox.value = item

        label.appendChild( checkbox )
        label.appendChild( document.createTextNode( ` ${ item }` ) )
        container.appendChild( label )
    } )
}

// Função para pegar os valores dos checkboxes marcados
function getCheckedValues ( containerId ) {
    const checkboxes = document.querySelectorAll( `#${ containerId } input[type="checkbox"]:checked` )
    return Array.from( checkboxes ).map( cb => cb.value )
}


// --- Inicialização da Página ---

// Popula a interface com os dados
criarCheckboxes( brinquedosP1Div, todosOsBrinquedos, 'brinquedo-p1' )
criarCheckboxes( brinquedosP2Div, todosOsBrinquedos, 'brinquedo-p2' )
criarCheckboxes( animaisDiv, todosOsAnimais, 'animal' )


// --- Event Listener Principal ---

verificarBtn.addEventListener( 'click', () => {
    // 1. Coleta os dados da interface
    const brinquedosP1 = getCheckedValues( 'brinquedos-p1' )
    const brinquedosP2 = getCheckedValues( 'brinquedos-p2' )
    const animaisSelecionados = getCheckedValues( 'animais-disponiveis' )

    // 2. Formata os dados para o formato esperado pela classe
    const brinquedosP1Str = brinquedosP1.join( ',' )
    const brinquedosP2Str = brinquedosP2.join( ',' )
    const animaisStr = animaisSelecionados.join( ',' )

    // 3. Chama a lógica principal do desafio
    const resultado = abrigo.encontraPessoas( brinquedosP1Str, brinquedosP2Str, animaisStr )

    // 4. Exibe o resultado na tela
    resultadosDiv.innerHTML = '' // Limpa resultados anteriores

    if ( resultado.erro ) {
        resultadosDiv.innerHTML = `<p class="erro">Erro: ${ resultado.erro }</p>`
    } else if ( resultado.lista && resultado.lista.length > 0 ) {
        resultado.lista.forEach( item => {
            const p = document.createElement( 'p' )
            p.className = 'resultado-item'
            p.textContent = item
            resultadosDiv.appendChild( p )
        } )
    } else {
        resultadosDiv.innerHTML = '<p>Nenhuma combinação válida encontrada ou nenhum animal selecionado.</p>'
    }
} )