import { lazy, Suspense} from 'react';
import BaseLayout from './layouts/BaseLayout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const SofaArmConcept = lazy(() => import('./pages/SofaArmConcept'));
const SteeringWheelConcept = lazy(() => import('./pages/SteeringWheelConcept'));

export const routes = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path : '/',
                element: <Suspense fallback={<div>Loading...</div>}><LandingPage /></Suspense>,
                errorElement: <div>Oops! Something went wrong.</div>
            },
            {
                path: '/examples',
                children : [
                    {
                        path: '/examples/sofa-arm',
                        element: <Suspense fallback={<div>Loading...</div>}><SofaArmConcept /></Suspense>,
                        errorElement: <div>Oops! Something went wrong.</div>
                    },
                    {
                        path: '/examples/steering-wheel',
                        element: <Suspense fallback={<div>Loading...</div>}><SteeringWheelConcept /></Suspense>,
                        errorElement: <div>Oops! Something went wrong.</div>
                    }
                ]
            }
        ],
    },
]