import { useLocation } from "react-router-dom";
import { Card, CardTitle, Col, Row, CardBody, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { IEditorial } from '../../shared/interface/responseRequestEditorialService';
import { TEXT_FORM } from "../../shared/constant/textForm";
import EditorialForm from './EditorialForm';

const textForm = TEXT_FORM["formEditorial"];

const EditorialUpdatePage =()=>{
    const location = useLocation();
    const dataEditorial:IEditorial =location.state;

    console.log(dataEditorial)
    return (
        <Row>
        <Col>
          <Card>
            <CardTitle tag="h4" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              {textForm.titleFormEditar}
            </CardTitle>
            <CardBody>
            <EditorialForm createEditorial={false} editorialData={dataEditorial}></EditorialForm>
          
            </CardBody>
  
          </Card>
  
        </Col>
      </Row>
    )
}

export default EditorialUpdatePage;