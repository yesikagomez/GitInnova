import React, {useState,useEffect} from 'react';
import { Button,Form } from 'react-bootstrap';
import './../App.css';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import {Modal} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import MaterialTable from "material-table";
import axios from 'axios';
import BarInfo from './BarInfo';
import './../index.css';

const cookies = new Cookies();

const columns= [
    { title: 'Nombre', field: 'name' },
    { title: 'Descripción', field: 'description' },
    { title: 'Rama', field: 'default_branch' },
    { title: 'Lenguaje', field: 'language'},
    { title: 'Url Git', field: 'html_url', type: 'link'}
  ];

  let info ;

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
            const [usuario, getusuario] = useState([]);
            const [data, setData]= useState([]);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);

        const schema = Yup.object().shape({
            nombre: Yup.string().required("Valor requerido"),
            apellido: Yup.string().required("Valor requerido"),
            fechanacimiento: Yup.date().min(1950, "El valor debe ser mayor o igual a 1950").max(2010, "El valor no debe ser mayor a 2010").required("El valor es requerido"),
            correo: Yup.string().email("Ingrese un correo valido").required("El correo es un valor requerido"),
            usuariogithub: Yup.string().required("Campo requerido"),
            cedula: Yup.string().required("Campo requerido").min(5, "Minimo 5 caracteres").min(0, "El valor debe ser positivo")
        })

        async function  peticionGet (usuariogithub){
            await axios.get(`https://api.github.com/users/${usuariogithub}/repos`)
            .then(response=>{
             setData(response.data);
             if (response.status === 200) {
                handleShow();
           }else{
            Swal.fire({
                icon: 'error',
                text: 'No se pudieron obtener datos'
              })
           }
            }).catch(error=>{
              console.log(error);
            })
          }
    return (
        <div>
             <BarInfo nombrecliente={usuario.name} correo={cookies.get('correo')}/>
            <Formik
                validationSchema={schema}
                onSubmit={async(values) => {
                    let respuesta = await fetch(`https://api.github.com/users/${values.usuariogithub}`)
                    info = await respuesta.json()
                   if (respuesta.status === 200) {
                        cookies.set('nombre', values.nombre, {path:'/'});
                        cookies.set('apellido', values.apellido, {path: "/"});
                        cookies.set('cedula', values.cedula, {path:'/'});
                        cookies.set('fechanacimiento', values.fechanacimiento, {path:'/'});
                        cookies.set('correo', values.correo, {path: "/"});
                        cookies.set('usuarigithub', values.usuariogithub, {path:'/'});
                        getusuario(info);
                        document.getElementById('ver').style.display = "inline";
                    }else{
                        Swal.fire({
                            icon: 'error',
                            text: 'El usuario no existe',
                          })
                    }
                }}
                
                initialValues={{
                    nombre: " ",
                    apellido: "",
                    cedula: "",
                    fechanacimiento: "",
                    correo: "",
                    usuariogithub:"",
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
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
                            placeholder="Ingrese cedula"
                            name="cedula"
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
                            onBlur={handleBlur}
                            isValid={touched.usuariogithub && !errors.usuariogithub}
                            isInvalid={!!errors.usuariogithub}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.usuariogithub}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-center">
                            <Button  variant="dark" type="submit">
                                Guardar
                            </Button>
                        <div  id="ver" className="ver">
                            <Button className="m-3" variant="dark" type="submit" onClick={()=>peticionGet(values.usuariogithub)}>
                                Ver Repositorios
                            </Button>
                        </div>
                    </div>
                </Form>
                }}
            </Formik>
            <Modal 
                show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Repositorios de {usuario.name}</Modal.Title>
                    <img src={usuario.avatar_url} id="imagen" className="rounded-circle"></img>
                </Modal.Header>
                <Modal.Body>
                <MaterialTable
                    columns={columns}
                    data={data}
                    title= {usuario.login}
                    options={{
                        headerStyle: {
                            backgroundColor: '#000000',
                            color: '#FFF',
                            searchFieldStyle:'#3544321'
                          },
                        actionsColumnIndex: -1,
                    }}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default InformacionCandidato
