import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import EditorialForm from "../Editorial/EditorialForm";
import { TEXT_FORM } from "../../shared/constant/textForm";
import LibroForm from "./LibroForm";
import { ILibro } from '../../shared/interface/responseRequestLibroService';
import { useLocation } from "react-router-dom";

const LibroCrearPage = () => {
    let nuevaLibro:ILibro={
        folio: "",
        titulo:"",
        descripcion:"",
        autor:"",
        fkEditorial:"",
        anio:0,
        numCopias:0
    };
    const textForm = TEXT_FORM["formLibro"];
    const textGeneric = TEXT_FORM["formGeneric"];

    

    return (
    <Row>
    <Col>
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            {textForm.titleFormLibro}
          </CardTitle>
          <CardBody>
            <LibroForm  createLibro={true} libroForm={nuevaLibro}></LibroForm>
          </CardBody>

        </Card>

      </Col>
    </Row>
    
    )

};

export default LibroCrearPage;