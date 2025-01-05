import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import WelcomePage from '../components/WelcomePage';
import HomePage from '../components/HomePage/HomePage';
import ArtifactPage from '../components/ArtifactPage';
import ManageArtifacts from '../components/ManageArtifactsPage';
import ManageQuestionsPage from '../components/ManageQuestionsPage';
import CreateArtifactPage from '../components/CreateArtifactPage';
import EditArtifactPage from '../components/EditArtifactPage';

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
        element: <ArtifactPage />
      },
      {
        path: '/artifacts/new',
        element: <CreateArtifactPage />
      },
      {
        path: '/artifacts/:artifactId/edit',
        element: <EditArtifactPage />
      },
      {
        path: '/archiver/artifacts',
        element: <ManageArtifacts />
      },
      {
        path: '/archiver/questions',
        element: <ManageQuestionsPage />
      },
      {
        path: '/archiver/answers',
        element: <h1>Archivers answers</h1>
      },
    ],
  },
]);
