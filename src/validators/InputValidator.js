import { ANIMAIS_DB } from '../data/animais.db.js'

// Responsabilidade: Validar os dados de entrada (animais e brinquedos).
export class InputValidator {
    constructor () {
        this.animaisDB = ANIMAIS_DB
        this.brinquedosValidos = new Set( Object.values( ANIMAIS_DB ).flatMap( animal => animal.brinquedos ) )
    }

    validate ( animais, brinquedosP1, brinquedosP2 ) {
        this._validateAnimais( animais )
        this._validateBrinquedos( brinquedosP1 )
        this._validateBrinquedos( brinquedosP2 )
    }

    _validateAnimais ( animais ) {
        if ( new Set( animais ).size !== animais.length ||
            animais.some( animal => !this.animaisDB[ animal ] ) ) {
            throw new Error( 'Animal inválido' )
        }
    }

    _validateBrinquedos ( brinquedos ) {
        if ( new Set( brinquedos ).size !== brinquedos.length ||
            brinquedos.some( brinquedo => !this.brinquedosValidos.has( brinquedo ) ) ) {
            throw new Error( 'Brinquedo inválido' )
        }
    }
}