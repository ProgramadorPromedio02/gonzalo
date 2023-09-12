import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import logo from "../img/logosmall.png";
import styles from "../styles/LoginDesigne.module.css";
import CardForm from "../components/CardForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ScreenLogin() {
  const [username, setUsername] = useState("");
  const [passUser, setPassUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        {
          username: username,
          password: passUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setLoginSuccess(true);
        setShowModal(true);
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      } else {
        setLoginSuccess(false);
        setShowModal(true);
      }
    } catch (error) {
      console.log("error", error);
      alert("Hubo un error en el proceso de inicio de sesión.");
    }
  }
  const modalTitle = loginSuccess ? "Login Exitoso" : "Login Incorrecto";
  const modalMessage = loginSuccess ? "Usuario/Contraseña correctos. ¿Quieres ir al home?" : "Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.";
  return (
    <div className="d-flex justify-content-center">
      <CardForm content={
        <Container>
          <Row className="d-flex flex-column">
            <Col sm={4}>
              <Link to="/" ><button className="btn btn-primary m-1">Volver Inicio</button></Link>
            </Col>
            <Col sm={12} className="text-center" >
              <h3>Login</h3>
              <img alt="logo" src={logo} className={`mb-2 ${styles['dimensiones-logo']}`}/>
            </Col>
            <br />
            <Col sm={12} className="d-flex justify-content-center">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="email">UserName</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassUser(e.target.value)} />
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="check" />
                </div>
              </form>
            </Col>
            <Col className="d-flex mt-4 p-2 justify-content-center">
              <Link to="/register" className=" m-2 ">Registrarme</Link>
              <button type="submit" className="btn btn-primary m-2" onClick={handleLogin}>Iniciar Sesión</button>
            </Col>
          </Row>
          {showModal && (
            <div
              className="modal show"

              style={{
                display: 'block',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1050,
              }}
            >
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>{modalMessage}</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                  {loginSuccess ? (
                    <Button variant="primary" onClick={() => navigate('/')}>Go to Home</Button>
                  ) : (
                    <Button variant="primary" onClick={() => setShowModal(false)}>OK</Button>
                  )}
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          )}
        </Container>
      } />
    </div>
  );
};

export default ScreenLogin;
