import "./componentes.js";

describe('SectionComponent', ()=> {

    it('renders the component and sets the params', ()=>{

        // ARRANGE
        const clase = 'class'
        const section = document.createElement('section-example-component')

        // ACT
        section.setAttribute('class', clase)
        document.body.append(section)
        
       // ASSERT 
       expect(section.querySelector('h2').textContent).toEqual('The hardcoded subtitle')
       expect(section.querySelector('h1').textContent).toEqual(clase)

    })
})