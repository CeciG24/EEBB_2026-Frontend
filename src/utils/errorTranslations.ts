/**
 * Función para traducir errores de validación de Laravel al español
 */
export function translateError(errorMessage: string): string {
  const translations: { [key: string]: string } = {
    // Errores comunes de validación
    "The :attribute field is required.": "Este campo es obligatorio.",
    "The name field is required.": "El nombre es obligatorio.",
    "The email field is required.": "El correo electrónico es obligatorio.",
    "The password field is required.": "La contraseña es obligatoria.",
    "The password confirmation field is required.": "La confirmación de contraseña es obligatoria.",
    "The institucion field is required.": "La institución es obligatoria.",
    "The nivel field is required.": "El nivel educativo es obligatorio.",
    "The licenciatura field is required.": "La carrera es obligatoria.",
    "The tipo inscripcion field is required.": "El tipo de inscripción es obligatorio.",
    
    // Errores de email
    "The email must be a valid email address.": "Debe ser un correo electrónico válido.",
    "The email has already been taken.": "Este correo ya está registrado.",
    
    // Errores de contraseña
    "The password must be at least 8 characters.": "La contraseña debe tener al menos 8 caracteres.",
    "The password confirmation does not match.": "Las contraseñas no coinciden.",
    "The password field confirmation does not match.": "Las contraseñas no coinciden.",
    
    // Errores de longitud
    "The :attribute must be at least :min characters.": "Debe tener al menos :min caracteres.",
    "The :attribute may not be greater than :max characters.": "No puede tener más de :max caracteres.",
    
    // Errores de autenticación
    "Validation failed": "Error de validación",
    "The given data was invalid.": "Los datos proporcionados son inválidos.",
    "These credentials do not match our records.": "Las credenciales no coinciden con nuestros registros.",
    "Unauthenticated.": "No autenticado.",
    "Credenciales incorrectas": "Las credenciales son incorrectas.",
    
    // Errores del servidor
    "Server Error": "Error del servidor",
    "Internal Server Error": "Error interno del servidor",
    "Service Unavailable": "Servicio no disponible",
  };

  // Buscar traducción exacta
  if (translations[errorMessage]) {
    return translations[errorMessage];
  }

  // Buscar patrones con regex para mensajes dinámicos
  if (errorMessage.includes("at least") && errorMessage.includes("characters")) {
    const match = errorMessage.match(/at least (\d+)/);
    if (match) {
      return `Debe tener al menos ${match[1]} caracteres.`;
    }
  }

  if (errorMessage.includes("may not be greater than") && errorMessage.includes("characters")) {
    const match = errorMessage.match(/greater than (\d+)/);
    if (match) {
      return `No puede tener más de ${match[1]} caracteres.`;
    }
  }

  if (errorMessage.includes("has already been taken")) {
    return "Este valor ya está registrado.";
  }

  if (errorMessage.includes("is required")) {
    return "Este campo es obligatorio.";
  }

  if (errorMessage.includes("must be") && errorMessage.includes("email")) {
    return "Debe ser un correo electrónico válido.";
  }

  if (errorMessage.includes("do not match") || errorMessage.includes("does not match")) {
    return "Los valores no coinciden.";
  }

  if (errorMessage.includes("credentials")) {
    return "Las credenciales son incorrectas.";
  }

  // Si no hay traducción, devolver el mensaje original
  return errorMessage;
}
