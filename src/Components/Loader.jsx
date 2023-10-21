import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Oval } from 'react-loader-spinner'

function Loader() {
  return (

    <Container>
        <Row>
            <Col className="d-flex justify-content-center align-items-center" style={{marginTop:"20%"}}>
                <Oval
                    ariaLabel="loading-indicator"
                    height={100}
                    width={100}
                    strokeWidth={5}
                    strokeWidthSecondary={1}
                    color="blue"
                    secondaryColor="white"
                />
            </Col>
        </Row>
    </Container>
  )
}

export default Loader
