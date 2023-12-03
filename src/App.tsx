import React, { useState } from "react";
import User from "./models/user";
import useFetchUser from "./hooks/useFetchUser";
import UserCard from "./components/UserCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const App: React.FC = () => {
  const { fetchUser, userData, isLoading, error } = useFetchUser();

  const [prevUserData, setPrevUserData] = useState<User | null>(null);

  const handleFetchNewUser = () => {
    // save current state Data as Prev User before update
    setPrevUserData(userData);
    fetchUser();
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <UserCard
              currData={userData}
              prevData={prevUserData}
              loading={isLoading}
              onNewUser={handleFetchNewUser}
            />
          </Col>
        </Row>
      </Container>

      {!isLoading && !userData && !error && (
        <Alert className="position-absolute bottom-0 start-0" variant="warning">
          Not found data!
        </Alert>
      )}
      {!isLoading && error && (
        <Alert className="position-absolute bottom-0 start-0" variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner
          className="position-absolute top-50 start-50"
          animation="grow"
          variant="light"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default App;
