import { Routes, Route } from 'react-router-dom';
import ReceiversPage from "./Pages/Receivers";

export const links = [
    { name: 'Seus lotes', path: '/batcg', element: '' },
    { name: 'Suas transferências', path: '/transactions', element: '' },
    { name: 'Seus recebedores', path: '/receivers', element: <ReceiversPage /> },
    { name: 'Importação', path: '/import', element: '' },
    { name: 'Indicatores', path: '/indicators', element: '' },
    { name: 'Confuguração', path: '/settings', element: ''},
]

function Router() {
    return(
        <Routes>
            {links.map((link, index) => <Route key={index} path={link.path} element={link.element} /> )}
        </Routes>
    )
}

export default Router;