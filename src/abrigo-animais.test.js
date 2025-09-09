import { AbrigoAnimais } from "./abrigo-animais"

describe( 'Abrigo de Animais', () => {

  test( 'Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas( 'CAIXA,RATO', 'RATO,BOLA', 'Lulu' )
    expect( resultado.erro ).toBe( 'Animal inválido' )
    expect( resultado.lista ).toBeFalsy()
  } )

  test( 'Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo' )
    expect( resultado.lista[ 0 ] ).toBe( 'Fofo - abrigo' )
    expect( resultado.lista[ 1 ] ).toBe( 'Rex - pessoa 1' )
    expect( resultado.lista.length ).toBe( 2 )
    expect( resultado.erro ).toBeFalsy()
  } )

  test( 'Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas( 'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola' )

    expect( resultado.lista[ 0 ] ).toBe( 'Bola - abrigo' )
    expect( resultado.lista[ 1 ] ).toBe( 'Fofo - pessoa 2' )
    expect( resultado.lista[ 2 ] ).toBe( 'Mimi - abrigo' )
    expect( resultado.lista[ 3 ] ).toBe( 'Rex - abrigo' )
    expect( resultado.lista.length ).toBe( 4 )
    expect( resultado.erro ).toBeFalsy()
  } )

  // Teste para a regra de brinquedo duplicado
  test( 'Deve rejeitar lista de brinquedos com itens duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas( 'BOLA,RATO,BOLA', 'LASER', 'Rex' )
    expect( resultado.erro ).toBe( 'Brinquedo inválido' )
  } )

  // Teste para a regra de brinquedo que não existe
  test( 'Deve rejeitar lista com brinquedo inválido (não existente)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas( 'RATO,OSSO', 'LASER', 'Rex' )
    expect( resultado.erro ).toBe( 'Brinquedo inválido' )
  } )

  // Teste para a regra de animal duplicado na lista de entrada
  test( 'Deve rejeitar lista de animais com nomes duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas( 'RATO,BOLA', 'LASER', 'Rex,Fofo,Rex' )
    expect( resultado.erro ).toBe( 'Animal inválido' )
  } )

  // Teste para a REGRA 3: Adoção de Gato (correspondência exata de brinquedos)
  test( 'Deve atribuir um gato apenas à pessoa com a lista de brinquedos exata', () => {
    // Pessoa 1 tem a lista exata para Mimi. Pessoa 2 tem os brinquedos, mas com um item a mais.
    const resultado = new AbrigoAnimais().encontraPessoas( 'BOLA,LASER', 'BOLA,LASER,RATO', 'Mimi' )
    expect( resultado.lista ).toEqual( [ 'Mimi - pessoa 1' ] )
  } )

  // Teste para a REGRA 4: Empate claro na adoção de um cão
  test( 'Deve manter o animal no abrigo se ambas as pessoas forem aptas (empate)', () => {
    // Ambas as pessoas têm os brinquedos necessários para o Rex na ordem correta.
    const resultado = new AbrigoAnimais().encontraPessoas( 'RATO,BOLA', 'LASER,RATO,BOLA', 'Rex' )
    expect( resultado.lista ).toEqual( [ 'Rex - abrigo' ] )
  } )

  // Teste para a REGRA 5: Limite de 3 adoções por pessoa
  test( 'Não deve permitir que uma pessoa adote mais de três animais', () => {
    // Pessoa 1 é apta para adotar Rex, Bola, Bebe e Zero, mas só pode levar os 3 primeiros.
    const brinquedosPessoa1 = 'RATO,BOLA,CAIXA,NOVELO,LASER'
    const animais = 'Rex,Bola,Bebe,Zero'
    const resultado = new AbrigoAnimais().encontraPessoas( brinquedosPessoa1, '', animais )

    // O resultado deve estar em ordem alfabética.
    expect( resultado.lista ).toEqual( [
      'Bebe - pessoa 1',
      'Bola - pessoa 1',
      'Rex - pessoa 1',
      'Zero - abrigo' // Fica no abrigo pois a pessoa 1 atingiu o limite.
    ] )
  } )

  // Teste para a REGRA 6: Adoção do Loco COM companhia (sucesso)
  test( 'Deve permitir a adoção do Loco se a pessoa também adotar outro animal', () => {
    // A pessoa 1 pode adotar o Rex e o Loco (ordem dos brinquedos não importa).
    const resultado = new AbrigoAnimais().encontraPessoas( 'SKATE,BOLA,RATO', '', 'Rex,Loco' )
    expect( resultado.lista ).toEqual( [ 'Loco - pessoa 1', 'Rex - pessoa 1' ] )
  } )

  // Teste para a REGRA 6: Adoção do Loco SEM companhia (falha)
  test( 'Deve manter o Loco no abrigo se a pessoa não adotar mais nenhum animal', () => {
    // A pessoa 1 tem os brinquedos do Loco, mas não do Bola. Como ela só adotaria o Loco, a regra da companhia falha.
    const resultado = new AbrigoAnimais().encontraPessoas( 'SKATE,RATO', 'NOVELO', 'Loco,Bola' )
    expect( resultado.lista ).toEqual( [ 'Bola - abrigo', 'Loco - abrigo' ] )
  } )
} )
