import { Card, CardTitle, Col, Row, CardBody, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { TEXT_FORM } from "../../shared/constant/textForm";
import { IUsuarioLibro } from '../../shared/interface/responseRequestUserLibroService';
import UsuarioLibroForm from './UsuarioLibroForm';


const UsuarioLibroCrearPage =({}) =>{
    const textForm = TEXT_FORM["formUsuarioLibro"];
    let nuevoUsuarioLibro:IUsuarioLibro={
        claveUsuario:"",
        nombre:"",
        direccion:"",
        telefono:""

    };

    return (
        <Row>
    <Col>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          {textForm.titleFormUsuario}
        </CardTitle>
        <CardBody>
            <UsuarioLibroForm createUsuarioLibro={true} usuarioLibro={nuevoUsuarioLibro}></UsuarioLibroForm> 
        </CardBody>

      </Card>

    </Col>
  </Row>
    );
    
};

export default UsuarioLibroCrearPage;