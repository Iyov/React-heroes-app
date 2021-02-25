import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";


describe('Pruebas en <HeroScreen />', () => {
    
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }
    
    test('Debe de mostrar el componente redirect si no hay argumentos en la URL', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/hero'] }>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        );
        expect( wrapper.find('Redirect').exists() ).toBe(true);

    });
    
    test('Debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.row').exists() ).toBe(true);

    });

    test('Debe de regresar a la pantalla anterior con push', () => {
        
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });
    
    test('Debe de regresar a la pantalla anterior', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledTimes(0);
        expect( historyMock.goBack ).toHaveBeenCalled();
    });
    
    test('Debe de llamar el redirect si el heroe no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spiderERROR'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
        expect( wrapper.find('Redirect').exists() ).toBe(false);

    });
    
});
