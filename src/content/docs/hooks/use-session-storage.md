---
title: Almacenamiento Persistente (Session)
description: Hook para gestionar estados que persisten durante la sesión del navegador.
---

`useSessionStorage` es un hook avanzado que permite manejar un estado de React sincronizado con el `sessionStorage` del navegador. Esto es ideal para guardar el progreso de un estudiante, configuraciones temporales o datos que deben sobrevivir a una recarga de la página (F5) pero borrarse al cerrar la pestaña.

## Cómo funciona

El hook se comporta de manera idéntica a `useState`, pero con un beneficio extra: cualquier cambio en el estado se guarda automáticamente como un string JSON en el almacenamiento de sesión. Al cargar el componente, el hook verifica si ya existe un valor previo para recuperar el progreso.

## Implementación y Uso

### 1. Importación

```tsx
import { useSessionStorage } from '@shared/hooks/use-session-storage';
```

---

### 2. Uso básico

Se define una clave única y un valor inicial:

```tsx
const [name, setName] = useSessionStorage<string>('user-name', 'Estudiante');

return (
  <input 
    type="text" 
    value={name} 
    onChange={(e) => setName(e.target.value)} 
  />
);
```

---

### 3. Ejemplo con objetos (Progreso)

```tsx
const [progress, setProgress] = useSessionStorage('course-progress', { 
  completedUnits: 0, 
  score: 0 
});

const handleComplete = () => {
  setProgress(prev => ({ 
    ...prev, 
    completedUnits: prev.completedUnits + 1 
  }));
};
```

---

## Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `key` | `string` | La clave única bajo la cual se guardará el dato en el `sessionStorage`. |
| `initialValue` | `T` | El valor por defecto si no se encuentra nada guardado previamente. |

## Retorno

Devuelve un arreglo (Array) con tres elementos:

| Índice | Nombre sugerido | Tipo | Descripción |
|---|---|---|---|
| `0` | `storedValue` | `T` | El valor actual (estado). |
| `1` | `setValue` | `Function` | Función para actualizar el valor (acepta valor directo o función de actualización). |
| `2` | `getCurrentValue` | `Function` | Función para consultar el valor actual directamente desde el storage. |

## Detalles Técnicos

- **Compatibilidad SSR:** El hook verifica si `window` está definido, permitiendo que el código no falle si se ejecuta en entornos de servidor (como la generación estática de Astro).
- **Serialización JSON:** Todos los datos se pasan por `JSON.stringify` al guardar y `JSON.parse` al leer, lo que permite guardar objetos y arreglos complejos.
- **Manejo de Errores:** Incluye bloques `try/catch` para evitar que fallos en el almacenamiento (como falta de espacio o datos corruptos) rompan la aplicación.

:::caution[Claves Únicas]
Asegúrate de usar claves únicas para cada dato que quieras guardar. Si dos componentes usan la misma clave (ej: `'progress'`), se sobrescribirán el uno al otro.
:::

