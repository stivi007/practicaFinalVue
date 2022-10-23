import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/productos",
      name: "productos",
      component: () => import("./components/ProductoList")
    },
    {
      path: "/productos/:id",
      name: "detalle-producto",
      component: () => import("./components/ActualizarProducto")
    },
    {
      path: "/nuevo-producto",
      name: "nuevo-producto",
      component: () => import("./components/NuevoProducto")
    },
    {
      path: "/categorias",
      name: "categorias",
      component: () => import("./components/CategoriaList")
    },
    {
      path: "/nueva-categoria",
      name: "nueva-categoria",
      component: () => import("./components/NuevaCategoria")
    },
    {
      path: "/categorias/:id",
      name: "detalle-categoria",
      component: () => import("./components/ActualizarCategoria")
    },
  ]
});
