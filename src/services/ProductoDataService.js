import http from "../http-common";

class ProductoDataService {
  getProductos() {
    return http.get('productos?_expand=categoria');
  }
  getProducto(id) {
    return http.get(`/productos/${id}`);
  }
  findProducto(search) {
    return http.get(`/productos?_expand=categoria&producto_like=${search}`);
  }
  guardarProducto(data) {
    return http.post(`/productos`, data);
  }
  actualizarProducto(id, data) {
    return http.put(`/productos/${id}`, data);
  }
  eliminarProducto(id) {
    return http.delete(`productos/${id}`);
  }
}

export default new ProductoDataService();