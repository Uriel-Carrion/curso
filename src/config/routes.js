//Layout
//Se creo un Layout principal para que solo se manden a llamar las paginas y muestren su contenido
import LayoutAdmin from '../layouts/LayoutAdmin';
//import LayoutBasic from '../layouts/LayoutBasic';
//admin pages
import AdminHome from '../pages/Admin';
import AdminLogin from '../pages/Admin/Login/Login';
import Error404 from '../pages/Error404';
//Se crea un array con todas las rutas a utilizar 
const routes = [
    {
        path: "/",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/home",
                component: AdminHome,
                exact: true
            },
            {
                path: "/",
                component: AdminLogin,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }

];

export default routes;