export interface ILibro {
  idLibro?: string;
  folio?: string;
  titulo?: string;
  descripcion?: string;
  autor?: string;
  fkEditorial?: string;
  anio?: number;
  numCopias?: number;
  dtAlta?: string;
  dtActualiza?: string;
  usuarioAlta?: string;
}
