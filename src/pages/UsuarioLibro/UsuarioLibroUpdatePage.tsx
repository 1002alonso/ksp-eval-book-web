import { useLocation } from 'react-router-dom';
import { IUsuarioLibro } from '../../shared/interface/responseRequestUserLibroService';
import UsuarioLibroForm from './UsuarioLibroForm';
import { Card, CardTitle, Col, Row, CardBody, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { TEXT_FORM } from "../../shared/constant/textForm";

const UsuarioLibroUpdatePage =  () => {
    const location = useLocation();
    const textForm = TEXT_FORM["formUsuarioLibro"];
    const dataUsuarioLibro:IUsuarioLibro =location.state;

    return (
        <Row>
        <Col>
          <Card>
            <CardTitle tag="h4" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              {textForm.titleFormEditarUsuario}
            </CardTitle>
            <CardBody>
                <UsuarioLibroForm createUsuarioLibro={false} usuarioLibro={dataUsuarioLibro}></UsuarioLibroForm> 
            </CardBody>
    
          </Card>
    
        </Col>
      </Row>

    )

}
export default UsuarioLibroUpdatePage;