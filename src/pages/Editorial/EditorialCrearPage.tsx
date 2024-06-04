import React, { useState } from 'react'
import { Card, CardTitle, Col, Row, CardBody, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { TEXT_FORM } from "../../shared/constant/textForm";
import { IEditorial } from '../../shared/interface/responseRequestEditorialService';
import EditorialForm from './EditorialForm';

const textForm = TEXT_FORM["formEditorial"];


const EditorialCrearPage = ({}) => {

let nuevaEditorial:IEditorial={};
   
nuevaEditorial.nombre="";



  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            {textForm.titleForm}
          </CardTitle>
          <CardBody>
          <EditorialForm createEditorial={true} editorialData={nuevaEditorial}></EditorialForm>
        
          </CardBody>

        </Card>

      </Col>
    </Row>
  )
};

export default EditorialCrearPage;
