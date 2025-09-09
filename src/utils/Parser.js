// Responsabilidade: Converter strings CSV em arrays, tratando casos de strings vazias.
export class Parser {
    static parse ( inputStr ) {
        if ( !inputStr ) {
            return []
        }
        return inputStr.split( ',' ).map( s => s.trim() )
    }
}