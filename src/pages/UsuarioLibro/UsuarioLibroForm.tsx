
import { IUsuarioLibro } from "../../shared/interface/responseRequestUserLibroService"
import { FormGroup, Input, Label,Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TEXT_FORM } from "../../shared/constant/textForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serviceUsuarioLibro } from '../../services/usuarioLibroService';
import { ResponseDefaultError } from "../../shared/interface/responseService";


interface IUsuarioLibroProps {
    createUsuarioLibro: boolean, usuarioLibro:IUsuarioLibro
}

const UsuarioLibroForm:React.FC<IUsuarioLibroProps> = (props:IUsuarioLibroProps)=>{
    const navigate = useNavigate();
    const textForm = TEXT_FORM["formUsuarioLibro"];
    const textGeneric = TEXT_FORM["formGeneric"];
    const [formData, setFormData] = useState(props.usuarioLibro);
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const toggle = () => setModal(!modal);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      
      };

    const handleSubmit = () => {
        

        if (formData.nombre === '' || formData.claveUsuario === '' || formData.direccion === '' || formData.telefono === '') {

            setMsgModal(textGeneric.msgDatosNulos);
            setModal(true)
            return
        }

        if (props.createUsuarioLibro) {
            createUsuarioLibro(formData);
            navigate(textForm.urlCrudHomeUsuarioLibro);
        }

        const idUserLibro:string=formData.idLibroUsuario ? formData.idLibroUsuario : "";

        updateUsuarioLibro(idUserLibro, formData)
        navigate(textForm.urlCrudHomeUsuarioLibro);

    }

    const createUsuarioLibro = async (nuevoUsuarioLibro:IUsuarioLibro)=>{
        serviceUsuarioLibro.postUsuarioLibroCreate(nuevoUsuarioLibro).subscribe({
            next: (getUserLibro: IUsuarioLibro | ResponseDefaultError) => {
      
            },
            error: (_error: any) => { },
            complete: () => { },
          });
    }

    const updateUsuarioLibro = async (id:string , editarUsuarioLibro:IUsuarioLibro )=>{
        serviceUsuarioLibro.putUsuarioLibroUpdate(id, editarUsuarioLibro).subscribe({
            next: (getEditorial: ResponseDefaultError) => {
              
            },
            error: (_error: any) => { },
            complete: () => { },
        });
    }

    return (
        <>
        <Form>
            <FormGroup >
                <Label for={textForm.textClaveUsuario}>{textForm.textClaveUsuario}</Label>
                <Input
                  value={formData.claveUsuario}
                  id={textForm.formClaveUsuario}
                  name={textForm.formClaveUsuario}
                  placeholder={textForm.textClaveHolderUsuario}
                  type="text"
                  onChange={handleInputChange}
                />

            </FormGroup >

            <FormGroup >
                <Label for={textForm.textNombreUsuario}>{textForm.textNombreUsuario}</Label>
                <Input
                  value={formData.nombre}
                  id={textForm.formNombreUsuario}
                  name={textForm.formNombreUsuario}
                  placeholder={textForm.textNombreHolderUsuario}
                  type="text"
                  onChange={handleInputChange}
                />
            </FormGroup >
            <FormGroup >
                <Label for={textForm.textDireccionUsuario}>{textForm.textDireccionUsuario}</Label>
                <Input
                  value={formData.direccion}
                  id={textForm.formDireccionUsuario}
                  name={textForm.formDireccionUsuario}
                  placeholder={textForm.textDireccionHolderUsuario}
                  type="text"
                  onChange={handleInputChange}
                />
            </FormGroup >
            <FormGroup >
                <Label for={textForm.textTelUsuario}>{textForm.textTelUsuario}</Label>
                <Input
                  value={formData.telefono}
                  id={textForm.formTelefonoUsuario}
                  name={textForm.formTelefonoUsuario}
                  placeholder={textForm.textTelHolderUsuario}
                  type="text"
                  onChange={handleInputChange}
                />
                    
            </FormGroup >
            <div className="button-group">
                        <Button onClick={handleSubmit} outline color="success">{textGeneric.btnTextEnviar}</Button>

                        <Link to={textForm.urlCrudHomeUsuarioLibro} className="btn btn btn-outline-warning" color="warning">
                            {textGeneric.btnTextCancelar}
                        </Link>
                    </div>
        </Form>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{textForm.titleCardUsuarioLibro}</ModalHeader>
                <ModalBody>
                    {msgModal}
                </ModalBody>
                <ModalFooter>

                    <Button color="info" onClick={toggle}>
                        {textGeneric.btnTextCerrar}

                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}


export default UsuarioLibroForm;