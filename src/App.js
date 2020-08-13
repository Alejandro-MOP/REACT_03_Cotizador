import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spiner from './components/Spiner';

/*==========================================
            Componentes CSS
==========================================*/

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;  
`;

const ContenedorFormulario = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
`;

/*==========================================
==========================================*/

function App() {

  const [resumen, guardarResumen] = useState ({
      cotizacion: 0,
      datos:{
          marca: '',
          year: '',
          plan: '',
      }
  });

  //state para el spiner
  const[cargando, guardarCargando] = useState(false);

  //Extraer datos
  const {cotizacion, datos} = resumen;

  return (
    <Contenedor>
      <Header
        titulo='Cotizador de Seguros'
      />

      <ContenedorFormulario>
        <Formulario 
          guardarResumen={guardarResumen}
          guardarCargando={guardarCargando}
        />

        {(cargando)
          ? <Spiner />
          : null
        }        

        <Resumen 
          datos={datos}
        />

        {!cargando
        ? (<Resultado 
          cotizacion={cotizacion}
          />)
        : null        
        }        
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
