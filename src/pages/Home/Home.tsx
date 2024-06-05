import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody,CardSubtitle } from "reactstrap";
import { TEXT_FORM } from '../../shared/constant/textForm';
import { serviceUsuarioLibro } from '../../services/usuarioLibroService';


import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { IUsuarioLibro } from '../../shared/interface/responseRequestUserLibroService';
import { ResponseDefaultError } from '../../shared/interface/responseService';
import { Link } from 'react-router-dom';

const listAvatar =[user1,user2,user3,user4,user5];
const tableData = [
    {
      avatar: user1,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Flexy React",
      status: "pending",
      weeks: "35",
      budget: "95K",
    },
    {
      avatar: user2,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Lading pro React",
      status: "done",
      weeks: "35",
      budget: "95K",
    },
    {
      avatar: user3,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Elite React",
      status: "holt",
      weeks: "35",
      budget: "95K",
    },
    {
      avatar: user4,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Flexy React",
      status: "pending",
      weeks: "35",
      budget: "95K",
    },
    {
      avatar: user5,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Ample React",
      status: "done",
      weeks: "35",
      budget: "95K",
    },
  ];

const HomePage = () => {
  const textForm = TEXT_FORM["formUsuarioLibro"];
  const textGeneric = TEXT_FORM["formGeneric"];
  const textPrestamo = TEXT_FORM["formPrestamo"];
  const [listUsuarioLibro, setUsuarioLibro] = useState(Array<IUsuarioLibro>);
 
  const getUsuarioLibrosAll = async () => {
    serviceUsuarioLibro.getUsuarioLibroReadAll().subscribe({
        next: (getListUsuarioLibro: Array<IUsuarioLibro> | ResponseDefaultError) => {
            if (Array.isArray(getListUsuarioLibro)) {
                setUsuarioLibro(getListUsuarioLibro);
            }

        },
        error: (_error: any) => { },
        complete: () => { },
    });
}

useEffect(() => {
  getUsuarioLibrosAll();
}, []);

    return (

        <Row>
             <Col lg="12">
             <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{textPrestamo.titleHome}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
           {textPrestamo.titleSistema}
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th></th>
                <th>{textForm.titleCrudClave}</th>

                <th>{textForm.titleCrudUsuarioLibro}</th>
                <th>{textGeneric.titleCrudAccion}</th>
              
              </tr>
            </thead>
            <tbody>
              {listUsuarioLibro.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={listAvatar[Math.floor(Math.random() * listAvatar.length)]}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                    
                    </div>
                  </td>
                  <td>{item.claveUsuario}</td>
                  <td>
                  {item.nombre}
                  </td>
                  <td>
                    <div className="button-group">

                      <Link to={textPrestamo.urlPrestamoLibro} state={item} className="btn btn btn-outline-info" color="success">
                        {textGeneric.btnTextPrestamo}
                      </Link>

                    
                    </div>

                  </td>
            
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
      </Col>
        </Row>
    )
};

export default HomePage;
