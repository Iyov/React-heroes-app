import React from 'react';
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { MemoryRouter } from 'react-router-dom';


describe('Pruebas en <DashboardRoutes />', () => {

    test('Debe mostrarse correctamente', () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Daniel'
            }
        }

        const wrapper = mount( 
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Daniel');

    });
    
});
