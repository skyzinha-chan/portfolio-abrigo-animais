// Responsabilidade: Encapsular todas as regras de negócio para a adoção.
export class AdoptionService {
    isEligible ( pessoaBrinquedos, animal ) {
        switch ( animal.tipo ) {
            case 'gato':
                return this._isExactMatch( pessoaBrinquedos, animal.brinquedos )
            case 'jabuti':
                return this._hasAllToys( pessoaBrinquedos, animal.brinquedos )
            default:
                return this._isSubsequence( pessoaBrinquedos, animal.brinquedos )
        }
    }

    _isSubsequence ( pessoaBrinquedos, animalBrinquedos ) {
        let i = 0
        let j = 0
        while ( j < pessoaBrinquedos.length && i < animalBrinquedos.length ) {
            if ( pessoaBrinquedos[ j ] === animalBrinquedos[ i ] ) {
                i++
            }
            j++
        }
        return i === animalBrinquedos.length
    }

    _isExactMatch ( pessoaBrinquedos, gatoBrinquedos ) {
        if ( pessoaBrinquedos.length !== gatoBrinquedos.length ) {
            return false
        }
        for ( let i = 0; i < pessoaBrinquedos.length; i++ ) {
            if ( pessoaBrinquedos[ i ] !== gatoBrinquedos[ i ] ) {
                return false
            }
        }
        return true
    }

    _hasAllToys ( pessoaBrinquedos, locoBrinquedos ) {
        const pessoaBrinquedosSet = new Set( pessoaBrinquedos )
        return locoBrinquedos.every( brinquedo => pessoaBrinquedosSet.has( brinquedo ) )
    }
}