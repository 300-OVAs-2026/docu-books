export type AnyType = any;

/**
 * Tipo que define los idiomas soportados.
 * 'en' para inglés y 'es' para español.
 */
export type Language = 'en' | 'es';

export enum OvaPageKind {
  START = 'start',
  OBJECTIVE = 'objective',
  VIDEO = 'video',
  QUIZ = 'quiz',
  CONTENT = 'content',
  RESUME = 'resume',
  FINISH = 'finish'
}

export type OvaPageType = {
  path: string;
  title: string;
  visited: boolean;
  kind: OvaPageKind;
};


/**
 * Tipo para las rutas de la OVA.
 * Cada ruta tiene un título y un componente asociado.
 */
export type RouteType = {
  title: string;
  component: JSX.Element;
  kind: OvaPageKind;
};