import React from 'react';
import { Button,Form } from 'react-bootstrap';
import './../App.css';
import { Formik } from 'formik';
import * as Yup from "yup";
import {Nav, Navbar} from 'react-bootstrap';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const Registro = () => {
        Yup.addMethod(Yup.mixed, 'methodName', function (anyArgsYouNeed) {
            const { message } = anyArgsYouNeed;
            return this.test('test-name', message, function (value) {
                const { path, createError } = this;
                const { some, more, args } = anyArgsYouNeed;
                return false
            });
        });
    
        const schema = Yup.object().shape({
            nombrecliente: Yup.string().required("Valor requerido"),
            nombreempresa: Yup.string().required("Valor requerido"),
            numempleados: Yup.number().min(1, "El valor debe ser mayor").required("El número de empleados es requerido"),
            annoslaborando: Yup.number().min(1, "El valor debe ser mayor").required("El campo es requerido"),
            correo: Yup.string().email("Ingrese un correo valido").required("El correo es un valor requerido"),
            contrasenna: Yup.string().required("Campo requerido").min(5, "Minimo 5 caracteres")
        })
    

    return (
        <div>
             <Navbar bg="dark" variant="dark" sticky="top" >  
                <Navbar.Brand href="/">RAS</Navbar.Brand>
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
                if(values.contrasenna==values.confirmar){
                    let respuesta = await fetch ('https://api-poskdjxg1.vercel.app/cliente', { method: 'POST', body: JSON.stringify(values), headers: { 'Content-Type': 'application/json' } })
                    //let cliente = await respuesta.json()
                    if (respuesta.status === 201) {
                        cookie.set('nombrecliente', values.nombrecliente, {path:'/'});
                        cookie.set('nombreempresa', values.nombreempresa, {path: "/"});
                        cookie.set('numempleados', values.numempleados, {path:'/'});
                        cookie.set('annoslaborando', values.annoslaborando, {path: "/"});
                        cookie.set('correo', values.correo, {path:'/'});
                        window.location.href="./Diagnostico";
                    }
                }else{
                    alert("La contraseña debe ser igual");
                }
                }}
                initialValues={{
                    nombrecliente: " ",
                    nombreempresa: " ",
                    numempleados: 0,
                    annoslaborando: 0,
                    correo: " ",
                    contrasenna:" ",
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
                        handleReset
                } = props;
                return <Form noValidate onSubmit={handleSubmit}>      
            
                <h2 className="m-3" >Registrese</h2>
                    <Form.Group controlId="nombrecliente">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nombrecliente" 
                            placeholder="Ingrese su nombre completo" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.nombrecliente && !errors.nombrecliente}
                            isInvalid={!!errors.nombrecliente}
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.nombrecliente}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="nombreempresa">
                        <Form.Label>Nombre Empresa</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Ingrese el nombre de su empresa"
                            name="nombreempresa"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.nombreempresa && !errors.nombreempresa}
                            isInvalid={!!errors.nombreempresa}
                            />
                            <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.nombreempresa}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="numempleados">
                        <Form.Label>Número de empleados</Form.Label>
                        <Form.Control
                            type="number" 
                            placeholder="Ingrese número de empleados" 
                            name="numempleados"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.numempleados && !errors.numempleados}
                            isInvalid={!!errors.numempleados}
                            />
                            <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.numempleados}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="annoslaborando">
                        <Form.Label>Años Laborando</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ingrese cuantos años lleva en funcionamiento la empresa" 
                            name="annoslaborando"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.annoslaborando && !errors.annoslaborando}
                            isInvalid={!!errors.annoslaborando}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.annoslaborando}</Form.Control.Feedback>
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
                    <Form.Group controlId="contrasenna">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Contraseña" 
                            name="contrasenna"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.contrasenna && !errors.contrasenna}
                            isInvalid={!!errors.contrasenna}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.contrasenna}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmar">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirme contraseña" 
                            name="confirmar"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.confirmar && !errors.confirmar}
                            isInvalid={!!errors.confirmar}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.confirmar}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                </Form>
                }}
            </Formik>
        </div>
    )
}

export default Registro
