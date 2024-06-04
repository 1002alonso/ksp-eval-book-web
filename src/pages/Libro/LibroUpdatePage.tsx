import { useLocation } from "react-router-dom";
import { ILibro } from "../../shared/interface/responseRequestLibroService";
import { Card, CardTitle, Col, Row, CardBody, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { TEXT_FORM } from "../../shared/constant/textForm";
import LibroForm from "./LibroForm";

const LibroUpdatePage = () => {
    const location = useLocation();
    const dataLibro:ILibro =location.state;
    const textForm = TEXT_FORM["formLibro"];

    return ( 
      <Row>
        <Col>
            <Card>
              <CardTitle tag="h4" className="border-bottom p-3 mb-0">
                <i className="bi bi-bell me-2"> </i>
                {textForm.titleFormLibro}
              </CardTitle>
              <CardBody>
                <LibroForm  createLibro={false} libroForm={dataLibro}></LibroForm>
              </CardBody>
    
            </Card>
    
          </Col>
        </Row>
        )

}

export default LibroUpdatePage;