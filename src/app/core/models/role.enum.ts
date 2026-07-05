/**
 * Roles reconocidos por el ecosistema NYU.
 * Deben coincidir exactamente con los strings que emite el backend en el JWT (claim "role").
 */
export enum Role {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}
