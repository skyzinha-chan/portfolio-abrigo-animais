import { ANIMAIS_DB } from './data/animais.db.js'
import { Parser } from './utils/Parser.js'
import { InputValidator } from './validators/InputValidator.js'
import { AdoptionService } from './services/AdoptionService.js'

// Responsabilidade: Orquestrar o processo de adoção, coordenando os outros módulos.
class AbrigoAnimais {
  constructor () {
    this.animaisDB = ANIMAIS_DB
    this.validator = new InputValidator()
    this.adoptionService = new AdoptionService()
  }

  encontraPessoas ( brinquedosPessoa1Str, brinquedosPessoa2Str, animaisStr ) {
    try {
      const animaisConsiderados = Parser.parse( animaisStr )
      const brinquedosPessoa1 = Parser.parse( brinquedosPessoa1Str )
      const brinquedosPessoa2 = Parser.parse( brinquedosPessoa2Str )

      this.validator.validate( animaisConsiderados, brinquedosPessoa1, brinquedosPessoa2 )

      const adocoes = { 'pessoa 1': [], 'pessoa 2': [] }
      let resultadosTemporarios = []

      for ( const nomeAnimal of animaisConsiderados ) {
        const animal = this.animaisDB[ nomeAnimal ]

        const p1Apta = this.adoptionService.isEligible( brinquedosPessoa1, animal )
        const p2Apta = this.adoptionService.isEligible( brinquedosPessoa2, animal )

        let destino = 'abrigo'
        if ( p1Apta && p2Apta ) {
          destino = 'abrigo' // Regra 4: Empate explícito
        } else if ( p1Apta && adocoes[ 'pessoa 1' ].length < 3 ) {
          destino = 'pessoa 1'
        } else if ( p2Apta && adocoes[ 'pessoa 2' ].length < 3 ) {
          destino = 'pessoa 2'
        }

        if ( destino !== 'abrigo' ) {
          adocoes[ destino ].push( nomeAnimal )
        }
        resultadosTemporarios.push( { nome: nomeAnimal, destino } )
      }

      const resultadosFinais = this._applyPostProcessingRules( resultadosTemporarios, adocoes )

      resultadosFinais.sort( ( a, b ) => a.nome.localeCompare( b.nome ) )
      const listaFormatada = resultadosFinais.map( res => `${ res.nome } - ${ res.destino }` )

      return { lista: listaFormatada }

    } catch ( error ) {
      return { erro: error.message }
    }
  }

  _applyPostProcessingRules ( resultados, adocoes ) {
    return resultados.map( res => {
      // REGRA 6 (Parte 2): Verifica a condição de companhia do Loco
      if ( res.nome === 'Loco' && res.destino !== 'abrigo' ) {
        const adotante = res.destino
        if ( adocoes[ adotante ].length <= 1 ) {
          return { ...res, destino: 'abrigo' }
        }
      }
      return res
    } )
  }
}

export { AbrigoAnimais as AbrigoAnimais }