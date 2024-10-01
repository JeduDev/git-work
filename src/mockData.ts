
type Document = {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    createdAt: Date;
    part: number;
    branch: string;
    content: any;
}

type Project = {
    name: string;
    thumbnail: string;
    description?: string;
    id: string;
};

interface ProjectGroup {
    lastEdited: string;
    items: Project[];
}


const Projects: Project[] = [
    {
        name: "Desarrollo de aplicacion web en python",
        description: "Este proyectoes una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        id: "1",
    },
    {
        name: "Desarrollo de aplicacion web en Nodejs",
        description: "Este proyectoes una aplicacion web en Nodejs",
        thumbnail:
            "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
        id: "2",
    },
];


export const mockData: ProjectGroup[] = [
    {
        lastEdited: "Today",
        items: [
            {
                name: "Desarrollo de aplicacion web en python",
                thumbnail:
                    "https://www.sketchappsources.com/resources/source-image/python-logo.png",
                id: "1",
            },
            {
                name: "Desarrollo de aplicacion web en Nodejs",
                thumbnail:
                    "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
                id: "2",
            },
        ],
    },

];




export const mockDataDocuments1: Document[] = [
    {
        id: "6-rfghytrf",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 6,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`

    },
    {
        id: "5-ijhbv",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 5,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`

    },
    {
        id: "4-iuyt",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 4,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`

    },
    {
        id: "3-nbvc",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python el cual consiste en un formulario de registro de usuarios en el que se solicitan datos personales y se realiza el registro de los mismos.",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 3,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`
    },
    {
        id: "2-ytre",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 2,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`

    },
    {
        id: "1-hgfds",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 1,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`

    },
    {
        id: "3-hgfds",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 1,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`
    },
    {
        id: "4-hgfds",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 1,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`
    },
    {
        id: "5-hgfds",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 1,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`
    },
    {
        id: "6-hgfds",
        name: "Creacion del proyecto",
        description: "Este documento es una aplicacion web en python",
        thumbnail:
            "https://www.sketchappsources.com/resources/source-image/python-logo.png",
        createdAt: new Date(),
        part: 1,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`
    }
]

export const mockDataDocuments2: Document[] = [
    {
        id: "2-5tghbngf",
        name: "Creacion del protecto en nodejs",
        description: "Este documento es una aplicacion en nodejs",
        thumbnail:
            "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
        createdAt: new Date(),
        part: 1,
        branch: "main",
        content: `<p><br></p><p><br></p><h1>hola</h1><ol><li>ere</li><li>hola</li><li>hola</li><li>hola</li></ol>`

    }
]

export const getDocumentDataById = (id: string | null) => {
    if (id === "1-hgfds") {
        return mockDataDocuments1[5]
    }

    if (id === "2-ytre") {
        return mockDataDocuments2[4]
    }

    if (id === "3-nbvc") {
        return mockDataDocuments1[3]
    }

    if (id === "4-iuyt") {
        return mockDataDocuments1[2]
    }

    if (id === "5-ijhbv") {
        return mockDataDocuments1[1]
    }

    if (id === "6-rfghytrf") {
        return mockDataDocuments1[0]
    }

    if (id === "2-5tghbngf") {
        return mockDataDocuments2[0]
    }

    return null
}

export const getProjectsById = (id: string | null) => {
    if (id === "1") {
        return Projects[0]
    }

    if (id === "2") {
        return Projects[1]
    }

    return null
}


export const getDocumentsById = (id: string | null) => {
    
    if (id === "1") {
        return mockDataDocuments1
    }

    if (id === "2") {
        return mockDataDocuments2
    }

    return null



};

