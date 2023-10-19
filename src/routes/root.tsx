import { createBrowserRouter } from 'react-router-dom'

import Outlet from '../components/Outlet'
import ErrorPage from '../pages/Error'
import Home from '../pages/Home'
import Marketplace from '../pages/Marketplace'
import SquadBuilder from '../pages/SquadBuilder'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'marketplace',
        element: <Marketplace />,
        children: [],
      },
      {
        path: 'squad-builder',
        element: <SquadBuilder />,
      },
    ],
  },
])

export default router
