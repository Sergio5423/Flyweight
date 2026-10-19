# Patrón de Diseño: Flyweight (Peso Ligero)

## ¿Qué es el Patrón Flyweight?

El **Flyweight** es un patrón de diseño **estructural** que te permite usar grandes cantidades de objetos de manera eficiente al compartir partes del estado común entre múltiples objetos, en lugar de mantener toda la información en cada instancia individual.

---

## Propósito y Problema que Resuelve

* **Problema:** Cuando una aplicación necesita crear una cantidad masiva de objetos similares (por ejemplo, millones de árboles en un bosque renderizado en 3D), almacenar todos los datos en cada objeto agota rápidamente la memoria RAM del sistema, provocando problemas de rendimiento o desbordamientos de memoria (*Out of Memory*).
* **Propósito:** Separar el estado de un objeto en dos partes:
1. **Estado Intrínseco (Compartido):** Datos constantes e invariables que se repiten en muchos objetos (como texturas, colores o nombres). Se almacenan en un único lugar compartido.
2. **Estado Extrínseco (Contextual):** Datos únicos que cambian de un objeto a otro (como coordenadas `x, y`).
De este modo, se reduce drásticamente el consumo de memoria mediante el uso compartido de instancias a través de una fábrica.



---

## Aplicabilidad (Basada en Refactoring.Guru)

Debes considerar el uso del patrón Flyweight en los siguientes escenarios:

1. **Consumo masivo de memoria:** Cuando tu aplicación soporta una cantidad enorme de objetos y esto consume la totalidad de la RAM disponible.
2. **Duplicación masiva de datos:** Cuando gran parte del estado de los objetos puede reducirse y compartirse porque se repite de forma constante entre ellos.
3. **Independencia del estado extrínseco:** Cuando el estado extrínseco de los objetos puede calcularse o pasarse externamente, permitiendo que los objetos compartidos sean totalmente ligeros y agnósticos al contexto.
4. **Almacenamiento centralizado:** Cuando se requiere un mecanismo de control o una fábrica centralizada (*Flyweight Pool*) para gestionar y reutilizar un número limitado de instancias pesadas.

---

## Comparativa Teórica: Antes vs. Después

### 1. El "Antes": Deuda Técnica y Falta de Optimización (Sin Flyweight)

* **Funcionamiento:** Cada objeto creado almacena de forma independiente absolutamente todos sus atributos (coordenadas, nombres, colores y texturas pesadas).
* **Consecuencias:**
* Duplicación redundante de datos pesados en memoria por cada instancia generada.
* Escalabilidad pobre ante la creación masiva de entidades, limitando severamente el rendimiento del sistema.



### 2. El "Después": Implementación Limpia con el Patrón Flyweight

* **Funcionamiento:** Se divide la estructura utilizando clases especializadas:
1. **La Clase Flyweight (`TreeType`):** Contiene exclusivamente el estado intrínseco compartido (texturas, colores, nombres).
2. **La Fábrica (`TreeFactory`):** Administra un *pool* de objetos para garantizar que los tipos compartidos se reutilicen en lugar de duplicarse.
3. **El Objeto Contextual (`Tree`):** Almacena únicamente el estado extrínseco (coordenadas) y una referencia ligera hacia el flyweight.


* **Ventajas:**
* Reducción drástica del uso de memoria RAM (de millones de objetos pesados a solo unos pocos tipos únicos compartidos).
* Eficiencia y fluidez optimizada en renderizado o procesamiento a gran escala.



---

## Otros Puntos Importantes a Considerar

* **Inmutabilidad del Estado Intrínseco:** Una vez creado un objeto flyweight, sus datos compartidos no deben modificarse, ya que cualquier cambio afectaría simultáneamente a todos los contextos que lo referencian.
* **Costo de Búsqueda:** Consultar o solicitar un flyweight a través de la fábrica introduce un ligero coste computacional de búsqueda en cada instanciación, el cual se compensa ampliamente con el ahorro masivo de memoria obtenido.
* **Separación de Responsabilidades:** Permite aislar con precisión la lógica contextual de la lógica intrínseco-estructural de los componentes pesados.

---
