// --- ANTES: Código sin el patrón Flyweight (Deuda Técnica) ---
// Cada objeto Tree almacena de forma independiente TODOS sus datos, 
// incluyendo texturas pesadas, colores y nombres, aunque sean idénticos en millones de árboles.

export class Tree {
    private x: number;
    private y: number;
    private name: string;
    private color: string;
    private texture: string; 

    constructor(x: number, y: number, name: string, color: string, texture: string) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    public draw(canvas: string): void {
        console.log(
            `Dibujando árbol [${this.name}] de color ${this.color} con textura '${this.texture}' en posición (${this.x}, ${this.y}) sobre el ${canvas}.`
        );
    }
}

export class Forest {
    private trees: Tree[] = [];
    private instanceCounter: number = 0;

    public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
        // Cada arbol creado puede duplicar parte de sus valores
        const tree = new Tree(x, y, name, color, texture);
        this.trees.push(tree);
        this.instanceCounter++;
    }

    public draw(canvas: string): void {
        console.log(`\n--- Renderizando bosque completo en ${canvas} (Sin Optimización) ---`);
        for (const tree of this.trees) {
            tree.draw(canvas);
        }
    }

    public getMemoryFootprintInfo(): void {
        console.log(`\n[Deuda Técnica / Memoria]: Se han creado ${this.instanceCounter} objetos en memoria.`);
        console.log(`Cada objeto Tree almacena copias redundantes de su nombre, color y textura.`);                
    }
}

// --- DEMO / EJECUCIÓN ---
function main() {
    const forest = new Forest();

    console.log("Plantando árboles sin Flyweight...\n");

    // Plantamos árboles repetitivos (mismas texturas y colores)
    forest.plantTree(10, 20, "Roble", "Verde Oscuro", "roble_textura_gigante.png");
    forest.plantTree(15, 25, "Roble", "Verde Oscuro", "roble_textura_gigante.png"); // Duplica toda la info pesada en memoria
    forest.plantTree(50, 80, "Pino", "Verde Claro", "pino_textura_gigante.png");
    forest.plantTree(55, 85, "Pino", "Verde Claro", "pino_textura_gigante.png");  // Duplica toda la info pesada en memoria
    forest.plantTree(100, 200, "Roble", "Verde Oscuro", "roble_textura_gigante.png"); // Duplica toda la info pesada en memoria

    forest.draw("Lienzo Principal 3D");
    forest.getMemoryFootprintInfo();
}

main();