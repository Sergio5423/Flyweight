// --- 1. CLASE FLYWEIGHT (Estado Intrínseco) ---
// Almacena los datos compartidos (pesados) que son idénticos para muchos árboles:
// nombre, color y textura.
export class TreeType {
    private name: string;
    private color: string;
    private texture: string;

    constructor(name: string, color: string, texture: string) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    public draw(canvas: string, x: number, y: number): void {
        // Simula la renderización combinando el estado intrínseco y las coordenadas extrínsecas
        console.log(
            `Dibujando árbol [${this.name}] de color ${this.color} con textura '${this.texture}' en posición (${x}, ${y}) sobre el ${canvas}.`
        );
    }
}

// --- 2. FÁBRICA FLYWEIGHT (TreeFactory) ---
// Gestiona el fondo de objetos compartidos (pool). Reutiliza instancias existentes
// si ya coinciden los atributos, ahorrando memoria masiva.
export class TreeFactory {
    private static treeTypes: Map<string, TreeType> = new Map();

    public static getTreeType(name: string, color: string, texture: string): TreeType {
        // Creamos una clave única basada en los atributos intrínsecos
        const key = `${name}_${color}_${texture}`;

        if (!TreeFactory.treeTypes.has(key)) {
            console.log(`[Fábrica]: Creando un nuevo TreeType para '${name}' (${color})...`);
            TreeFactory.treeTypes.set(key, new TreeType(name, color, texture));
        } else {
            console.log(`[Fábrica]: Reutilizando TreeType existente para '${name}' (${color}).`);
        }

        return TreeFactory.treeTypes.get(key)!;
    }

    // Método auxiliar opcional para ver cuántos tipos únicos hay en memoria
    public static getTypesCount(): number {
        return TreeFactory.treeTypes.size;
    }
}

// --- 3. OBJETO CONTEXTUAL (Tree / Estado Extrínseco) ---
// Almacena únicamente el estado único de cada árbol individual (coordenadas x, y)
// y una referencia ligera (el puente) hacia el objeto Flyweight compartido.
export class Tree {
    private x: number;
    private y: number;
    private type: TreeType;

    constructor(x: number, y: number, type: TreeType) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public draw(canvas: string): void {
        this.type.draw(canvas, this.x, this.y);
    }
}

// --- 4. CLASE CLIENTE (Forest) ---
// Administra una gran cantidad de árboles y coordina su plantación y dibujo.
export class Forest {
    private trees: Tree[] = [];

    public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
        // Solicita el tipo de árbol a la fábrica (se reutiliza si ya fue creado antes)
        const type = TreeFactory.getTreeType(name, color, texture);
        
        // Crea el árbol contextual (muy ligero en memoria)
        const tree = new Tree(x, y, type);
        this.trees.push(tree);
    }

    public draw(canvas: string): void {
        console.log(`\n--- Renderizando bosque completo en ${canvas} ---`);
        for (const tree of this.trees) {
            tree.draw(canvas);
        }
    }
}

// --- 5. DEMO / EJECUCIÓN ---
function main() {
    const forest = new Forest();

    console.log("Plantando árboles en el bosque virtual...\n");

    // Plantamos muchos árboles pero con patrones repetidos de texturas y colores
    forest.plantTree(10, 20, "Roble", "Verde Oscuro", "roble_textura.png");
    forest.plantTree(15, 25, "Roble", "Verde Oscuro", "roble_textura.png"); // Reutilizará el tipo "Roble"
    forest.plantTree(50, 80, "Pino", "Verde Claro", "pino_textura.png");
    forest.plantTree(55, 85, "Pino", "Verde Claro", "pino_textura.png");  // Reutilizará el tipo "Pino"
    forest.plantTree(100, 200, "Roble", "Verde Oscuro", "roble_textura.png"); // Reutilizará el tipo "Roble"

    // Dibujamos el bosque
    forest.draw("Lienzo Principal 3D");

    console.log(`\nResumen de optimización: Se crearon millones de árboles pero solo existen ${TreeFactory.getTypesCount()} objetos pesados (TreeType) en memoria.`);
}

main();