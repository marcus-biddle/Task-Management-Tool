import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 10rem;
`;

const FormContainer = styled.div`
  background-color: #f2f2f2;
  padding: 40px;
  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 30px;
`;

const WelcomeMessage = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const HomePage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUsername('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., authenticate user and redirect to server and tasks page
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your authentication logic here

    // Simulating the creation of a new user and storing the _id in local storage
    const newUser = {
      _id: 'user123', // Replace with the actual _id value from your authentication logic
      username: username,
      password: password,
    };
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setLoggedIn(true);
    setUsername(username);

    // Redirect to the server and tasks page
    // Add your navigation logic here
  };

  return (
    <Container>
      <FormContainer>
        <Title>Task Management Website</Title>
        <Description>Manage your tasks efficiently and stay organized.</Description>
        {!loggedIn ? (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Sign In</button>
          </Form>
        ) : (
          <>
            <p>Welcome {username}!</p>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

export default HomePage;
