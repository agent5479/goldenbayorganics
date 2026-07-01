import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/layout/Layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home'),
      },
      {
        path: 'stocklist',
        lazy: () => import('./pages/Stocklist'),
      },
      {
        path: 'visit',
        lazy: () => import('./pages/Visit'),
      },
      {
        path: 'about',
        lazy: () => import('./pages/About'),
      },
    ],
  },
]
