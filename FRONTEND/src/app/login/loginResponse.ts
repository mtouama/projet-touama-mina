export interface LoginResponse {
    token: string; // Le token d'authentification de l'utilisateur
    userId: number; // Identifiant unique de l'utilisateur
    username: string; // Nom d'utilisateur
    email: string; // Adresse e-mail
    expiresIn: number; // Durée de validité du token en secondes
    roles: string[]; // Liste des rôles associés à l'utilisateur
  }
  