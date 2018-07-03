export const HOME = "/";
export const LOGIN = '/login';
export const REGISTAR = '/registar';
export const PRODUTO = '/produto/';
export const LISTA_PRODUTOS = '/produtos/';
export const NOVIDADES = '/novidades';
export const PROMOCOES = '/promocoes';
export const PROCURA = '/procura/';
export const CARRINHO = '/carrinho';
export const CHECKOUT = '/checkout';

export const ENCOMENDAS = '/cliente/encomendas';
export const ENCOMENDA = '/cliente/encomendas/';
export const CONTA = '/cliente';

export const GESTOR = '/gestor';
export const GESTOR_HOME = '/gestor/home';
export const GESTAO_CLIENTES = '/gestor/clientes';
export const GESTAO_FUNCIONARIOS = '/gestor/funcionarios';
export const GESTAO_ENCOMENDAS = '/gestor/encomendas';
export const GESTAO_PRODUTOS = '/gestor/produtos';
export const GESTAO_PRODUTOS_CRIAR = '/gestor/produtos/criar';
export const GESTAO_PROMOCOES = '/gestor/promocoes';
export const GESTAO_PROMOCOES_CRIAR = '/gestor/promocoes/criar';
export const GESTAO_CATEGORIAS = '/gestor/categorias';

export const routesToTitle = (route) => {
    for (let i = 0; i < enumRoutes.length; i++) {
        let routeObj = enumRoutes[i];
        if (routeObj.exact) {
            if (routeObj.route === route) {
                return routeObj.title;
            }
        } else {
            let parts = route.split("/");
            if (new RegExp(routeObj.route).exec(route)) {
                return routeObj.title  + " " + parts[parts.length - 1];
            }
        }
    }
    return "";
}

const enumRoutes = [
    { route: '/gestor/home', title: "Home", exact: true },
    { route: '/gestor/clientes', title: "Gestão de clientes", exact: true },
    { route: '/gestor/clientes/', title: "Cliente", exact: false },
    { route: '/gestor/funcionarios', title: "Gestão de funcionários", exact: true },
    { route: '/gestor/encomendas', title: "Gestão de encomendas", exact: true },
    { route: '/gestor/encomendas/', title: "Encomenda", exact: false },
    { route: '/gestor/produtos', title: "Gestão de produtos", exact: true },
    { route: '/gestor/produtos/', title: "Produto", exact: false },
    { route: '/gestor/produtos/criar', title: "Registar produto", exact: true },
    { route: '/gestor/promocoes', title: "Gestão de promoções", exact: true },
    { route: '/gestor/promocoes/', title: "Promoção", exact: false },
    { route: '/gestor/promocoes/criar', title: "Registar promoção", exact: true },
    { route: '/gestor/categorias', title: "Gestão de categorias", exact: true },
    { route: '/gestor', title: "Gestão de loja", exact: true },
    { route: "/login", title: "Login", exact: true },
    { route: '/registar', title: "Registar", exact: true },
    { route: '/produto/', title: "Produto", exact: false },
    { route: '/produtos/', title: "Lista de produtos", exact: false },
    { route: '/novidades', title: "Novidades", exact: true },
    { route: '/promocoes', title: "Promoções", exact: true },
    { route: '/procura/', title: "Pesquisa", exact: false },
    { route: '/carrinho', title: "Carrinho", exact: true },
    { route: '/checkout', title: "Checkout", exact: true },
    { route: '/cliente/encomendas', title: "Encomendas", exact: true },
    { route: '/cliente/encomendas/', title: "Encomenda", exact: false },
    { route: '/cliente', title: "A minha Conta", exact: true },
]