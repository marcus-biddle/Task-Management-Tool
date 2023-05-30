import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../hooks/contexts/UserContext';
import { User } from '../../api/userApi';

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

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const HomePage: React.FC = () => {
    const { addUser, removeUserById ,users } = useUserContext();
    const [loggedIn, setLoggedIn] = useState(false);
  const [username, setCurrentUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<User>();
  const [returningUser, setReturningUser] = useState(false);

  useEffect(() => {
    console.log('useEffect users', users);
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setLoggedIn(true);
        setCurrentUser(parsedUser);
    }
  }, [users]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setLoggedIn(false);
        setCurrentUsername('');
    };

    const handleDelete = async () => {
        const id = currentUser ? currentUser._id : '';
        await removeUserById(id);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const newUser = {
          username: username,
          password: password,
        };

        if (!users.length) {
            console.log('there are no users in database.');
            const response = await addUser(newUser);
            setLoggedIn(true);
            setCurrentUser(response);
            localStorage.setItem('currentUser', JSON.stringify(response));

        } else if (users.length > 0) {
            const existingUser: User[] = users.filter((user: User) => user.username === username && user.password === password);
            if (existingUser.length === 0) {
                console.log('cannot find existing user:', existingUser)
                const response = await addUser(newUser);
                setLoggedIn(true);
                setCurrentUser(response);
                localStorage.setItem('currentUser', JSON.stringify(response));
            } else {
                console.log('user found:', existingUser);
                setReturningUser(true);
                setLoggedIn(true);
                setCurrentUser(existingUser[0]);
                localStorage.setItem('currentUser', JSON.stringify(existingUser[0]));
            }
            
        } else {
          // Handle authentication failure, show error message, etc.
          console.log('Authentication failed');
        }
      };
      

  return (
    <Container>
      <FormContainer>
        <Title>Task Management System</Title>
        <Description>Manage your tasks efficiently and stay organized.</Description>
        {!loggedIn ? (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setCurrentUsername(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Sign In</button>
          </Form>
        ) : (
          <>
            <p>{returningUser? 'Welcome back,' : 'Thanks for joining,'} {currentUser?.username}!</p>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </>
        )}
      </FormContainer>
    </Container>
  );
};

export default HomePage;
