import http from "../http-common";

class CategoriaDataService {
  getCategorias() {
    return http.get('categorias');
  }
  getCategoria(id) {
    return http.get(`/categorias/${id}`);
  }
  findCategoria(search) {
    return http.get(`/categorias?categoria_like=${search}`);
  }
  guardarCategoria(data) {
    return http.post(`/categorias`, data);
  }
  actualizarCategoria(id, data) {
    return http.put(`/categorias/${id}`, data);
  }
  eliminarCategoria(id) {
    return http.delete(`categorias/${id}`);
  }
}

export default new CategoriaDataService();
