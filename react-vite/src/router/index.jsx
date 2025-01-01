import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import WelcomePage from '../components/WelcomePage';
import HomePage from '../components/HomePage/HomePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/search',
        element: <h1>search</h1>
      },
      {
        path: '/artifacts/:artifactId',
        element: <h1>Artifact</h1>
      },
      {
        path: '/artifacts/new',
        element: <h1>Create an artifact</h1>
      },
      {
        path: '/archiver/artifacts',
        element: <h1>Archivers artifacts</h1>
      },
      {
        path: '/archiver/questions',
        element: <h1>Archivers questions</h1>
      },
      {
        path: '/archiver/answers',
        element: <h1>Archivers answers</h1>
      },
    ],
  },
]);
