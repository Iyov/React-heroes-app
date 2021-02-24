import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
    
    test('Debe de retornar el estado por defecto', () => {
        
        const state = authReducer( { logged: false }, '' );
        expect( state ).toEqual( { logged: false } );

    });

    test('Debe de autentificar y colocar el name del usuario', () => {
        
        const user = {
            name: 'Francisco',
            logged: true
        }
        const action = {
            type: types.login,
            payload: user
        }
        const state = authReducer( { logged: false }, action );
        // console.log(state);
        expect( state ).toEqual( user );

    });

    test('Debe de borrar el name del usuario y logged en false', () => {
        
        const action = {
            type: types.logout
        }
        const state = authReducer( { logged: true, name: 'Francisco' }, action );
        // console.log(state);
        expect( state ).toEqual( { logged: false } );

    });
    
});
