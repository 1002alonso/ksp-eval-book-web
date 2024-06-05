# KSP-EVAL-BOOK-WEB
# Proyecto React  18

ksp-eval-book-web esta desarrollado con React 18. El propósito de este proyecto es evaluar los conocimientos en front-end con React empleando componentes, hook, variables de estados y ciclos de vida de los componentes

## Contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas](#pruebas)

## Requisitos

- [Node.js](https://nodejs.org/) (v14.0.0 o superior)
- [npm](https://www.npmjs.com/)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/1002alonso/ksp-eval-book-web.git de la rama development
    cd tu-repositorio
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura la Api Rest:

    - Inicializar o identificar el servidor de la api
    - Si es https://localhost:7235 se modificara en el archivo textForm.ts en las llaves api|localhost
    - La ruta de este archivo es src/shared/constant

## Uso

1. Para iniciar la aplicación, usa el siguiente comando:

    ```bash
    npm start
    ```


## Estructura del Proyecto
```
KSP-EVAL-BOOK-WEB
│
├── /public            # Archivos públicos estáticos
├── /src
│   ├── /components    # Componentes React
│   ├── /pages         # Páginas del proyecto
│   ├── /styles        # Archivos de estilos (CSS, SASS, etc.)
│   ├── /utils         # Utilidades y helpers
│   ├── App.js         # Componente principal
│   ├── index.js       # Punto de entrada de React
│   └── index.css      # Estilos globales
├── .gitignore         # Archivos y directorios ignorados por Git
├── package.json       # Dependencias y scripts del proyecto
└── README.md          # Documentación del proyecto
```       
  
## Pruebas

```
npm test
```
