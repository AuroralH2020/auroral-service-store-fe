export interface IUser {
  username: string;
  password?: string;
  confirmPassword?: string;
  name: string;
  surnames: string;
  email?: string;
  role: string;
  tenantId: string;
}

export const UserDictionary = {
  username: 'Nombre de usuario',
  password: 'Contraseña',
  confirmPassword: 'Repetir contraseña',
  name: 'Nombre',
  surnames: 'Apellidos',
  email: 'Email',
  role: [
    'Rol',
    [
      ['admin', 'Administrador'],
      ['manager', 'Gerente'],
    ],
  ],
};
