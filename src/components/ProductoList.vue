<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Escriba aqui..."
          v-model="input_search"/>
        <div class="input-group-append">
          <button class="btn btn-primary" type="button"
            @click="searchFunction"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div><router-link to="/nuevo-producto" class="btn btn-primary">Crear nuevo</router-link></div>
      <h4>Listado de Productos</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos" :key="item.id"
          @click="mostrarProducto(item, item.id)">
            <td>{{ item.id }}</td>
            <td>{{ item.producto }}</td>
            <td>{{ item.precio }}</td>
            <td>{{ item.categoria.categoria }}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="col-md-6">

       
      <div v-if="productoSeleccionado">
        <div class="card">
       <div class="card-body">

        <h5 class="text-center">Producto Seleccionado</h5>
        <div>
          <label><strong>Producto:</strong></label> {{ productoSeleccionado.producto }}
        </div>
        <div>
          <label><strong>Precio:</strong></label> {{ productoSeleccionado.precio }}
        </div>
        <div>
          <label><strong>Categoria:</strong></label> {{ productoSeleccionado.categoria.categoria }}
        </div>

        <router-link :to="'/productos/' + productoSeleccionado.id" class="actualizar">Actualizar</router-link>
        <br>

        <a class="mr-2" @click="eliminar(productoSeleccionado.id)">
          Eliminar
        </a>

  </div>
        <br />
      </div>

      </div>

      <div v-else>
      </div>
      
    </div>
  </div>
</template>

<script>
import ProductoDataService from "../services/ProductoDataService";
export default {
  name: "lista-productos",
  data() {
    return {
      productos: [],
      productoSeleccionado: null,
      currentIndex: -1,
      input_search: ""
    };
  },
  mounted() {
    this.getProductos();
  },
  methods: {
    getProductos() {
      ProductoDataService.getProductos()
        .then(response => {
          this.productos = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    mostrarProducto(item, index) {
      this.productoSeleccionado = item;
      this.currentIndex = index;
    },
    
    searchFunction() {
      ProductoDataService.findProducto(this.input_search)
        .then(response => {
          this.productos = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    eliminar(id) {

  if(confirm("Esta seguro de eliminar el producto?")){
      ProductoDataService.eliminarProducto(id)
        .then(response => {
          console.log(response.data);
          this.getProductos();
          this.productoSeleccionado = null;
        })
        .catch(e => {
          console.log(e);
        });
}

    }
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.table{
  cursor: pointer;
}
.mr-2{
  cursor: pointer;
}
</style>
