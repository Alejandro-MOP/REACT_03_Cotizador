import React from 'react';
import styled from '@emotion/styled';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';


/*==========================================
            Componentes CSS
==========================================*/
const Mensaje = styled.p`
  margin-top: 2rem;
  padding: .5rem;
  text-align: center;
  font-weight: bold;
  color: #00838f;
`;

const ResultadoCotizacion = styled.div`
  text-align: center;
  padding: .5rem;
  border: 1px solid #26C6DA;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;

const TextoCotizacion = styled.p`
  color: #00838f;
  padding: .5rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;



/*==========================================
            Resultado
==========================================*/

const Resultado = ({cotizacion}) => {

    

    return ( 

        (cotizacion === 0) 
        ?<Mensaje>Elige la marca, año del automóvil y tipo de seguro.</Mensaje>
        :(  
            <ResultadoCotizacion>

                <TransitionGroup component="span" className="resultado" > 

                    <CSSTransition classNames="resultado" key={cotizacion} timeout={{ enter: 500, exit: 500}}>

                        <TextoCotizacion>El total de la cotización es: $ <span> {cotizacion}</span></TextoCotizacion>
                        
                    </CSSTransition>

                </TransitionGroup>

            </ResultadoCotizacion>
         )
     );
}

Resultado.propTypes ={
  cotizacion: PropTypes.number.isRequired
}
 
export default Resultado;