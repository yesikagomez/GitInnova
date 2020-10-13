import React, {useState} from 'react';
import { Button,Form,Pagination } from 'react-bootstrap';
import './../App.css';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import {Nav, Navbar,Modal,Table} from 'react-bootstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const InformacionCandidato = () => {
    
        Yup.addMethod(Yup.mixed, 'methodName', function (anyArgsYouNeed) {
            const { message } = anyArgsYouNeed;
            return this.test('test-name', message, function (value) {
                const { path, createError } = this;
                const { some, more, args } = anyArgsYouNeed;
                return false
            });
        });
            const [show, setShow] = useState(false);
            const [repos,consultar]=useState([]);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);

        const schema = Yup.object().shape({
            nombre: Yup.string().required("Valor requerido"),
            apellido: Yup.string().required("Valor requerido"),
            fechanacimiento: Yup.date().min(1950, "El valor debe ser mayor o igual a 1950").max(2010, "El valor no debe ser mayor a 2010").required("El valor es requerido"),
            correo: Yup.string().email("Ingrese un correo valido").required("El correo es un valor requerido"),
            usuariogithub: Yup.string().required("Campo requerido"),
            cedula: Yup.string().required("Campo requerido").min(5, "Minimo 5 caracteres")
        })
    
        async function abrirmodal (usuariogithub){
           let respuesta =  await fetch(`https://api.github.com/users/${usuariogithub}/repos`)
           let info =  await respuesta.json()
           consultar(info);
           if (respuesta.status === 200) {
                handleShow();
           }
        }
        let active = 2;
        let items = [];
        for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
        }

    return (
        <div>
             <Navbar bg="dark" variant="dark" sticky="top" >  
                <Navbar.Brand href="/">GitInnova</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Navbar.Brand>Maria</Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Formik
                validationSchema={schema}
                onSubmit={async(values) => {
                    let respuesta = await fetch(`https://api.github.com/users/${values.usuariogithub}`)
                    let info = await respuesta.json()
                   if (respuesta.status === 200) {
                        cookies.set('nombre', values.nombre, {path:'/'});
                        cookies.set('apellido', values.apellido, {path: "/"});
                        cookies.set('cedula', values.cedula, {path:'/'});
                        cookies.set('fechanacimiento', values.fechanacimiento, {path:'/'});
                        cookies.set('correo', values.correo, {path: "/"});
                        cookies.set('usuarigithub', values.usuariogithub, {path:'/'});
                    }else{
                        Swal.fire({
                            icon: 'error',
                            text: 'El usuario no existe',
                          })
                    }
                }}
                initialValues={{
                    nombre: " jesus",
                    apellido: "resptre",
                    cedula: "12345",
                    fechanacimiento: "08/08/2009",
                    correo: "yesika.go@hotmail.com",
                    usuariogithub:"yesikagomez",
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        data
                } = props;
                return <Form noValidate onSubmit={handleSubmit}>      
                <h2 className="m-3 text-center" >Registro de información del candidato</h2>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nombre" 
                            placeholder="Ingrese nombre" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombre}
                            isValid={touched.nombre && !errors.nombre}
                            isInvalid={!!errors.nombre}
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="apellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Ingrese apellido"
                            name="apellido"
                            value={values.apellido}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.apellido && !errors.apellido}
                            isInvalid={!!errors.apellido}
                            />
                            <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="cedula">
                        <Form.Label>Cedula</Form.Label>
                        <Form.Control
                            type="number" 
                            placeholder="Ingrese apellido"
                            name="cedula"
                            value={values.cedula}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.cedula && !errors.cedula}
                            isInvalid={!!errors.cedula}
                            />
                            <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.cedula}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="fechanacimiento">
                        <Form.Label>Fechanacimiento</Form.Label>
                        <Form.Control
                            type="date" 
                            placeholder="Ingrese fechanacimiento" 
                            name="fechanacimiento"
                            onChange={handleChange}
                            value={values.fechanacimiento}
                            onBlur={handleBlur}
                            isValid={touched.fechanacimiento && !errors.fechanacimiento}
                            isInvalid={!!errors.fechanacimiento}
                            />
                            <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.fechanacimiento}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="correo">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Ingrese su correo electronico" 
                            name="correo"
                            value={values.correo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.correo && !errors.correo}
                            isInvalid={!!errors.correo}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="usuariogithub">
                        <Form.Label>Usuario Github</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese usuario de github" 
                            name="usuariogithub"
                            onChange={handleChange}
                            value={values.usuariogithub}
                            onBlur={handleBlur}
                            isValid={touched.usuariogithub && !errors.usuariogithub}
                            isInvalid={!!errors.usuariogithub}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.usuariogithub}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                    <Button variant="primary" onClick={()=>abrirmodal(values.usuariogithub)}>
                        Ver Repositorios
                    </Button>
                </Form>
                }}
            </Formik>
            
            <Modal 
                show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
               
                    <Table striped bordered hover variant="dark" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Rama por Defecto</th>
                            <th>Lenguaje</th>
                            <th>Url Git</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        repos.map(item => {
                            return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.default_branch}</td>
                                <td>{item.language}</td>
                                <td><a href={item.html_url} target="_blank">{item.html_url}</a></td>
                            </tr>)
                        })
                        }
                        </tbody>
                    </Table>
                    <Pagination>{items}</Pagination>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default InformacionCandidato
