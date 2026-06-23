/**
 * Utilidades para manejar cookies de autenticación
 */

export const AuthCookie = {
  /**
   * Guardar tokens en cookies para el middleware
   */
  setTokens: (accessToken: string, refreshToken: string) => {
    // 1 hora para access token (3600 segundos)
    document.cookie = `access_token=${accessToken}; path=/; max-age=3600; secure; samesite=strict`;
    // 1 día para refresh token (86400 segundos)
    document.cookie = `refresh_token=${refreshToken}; path=/; max-age=86400; secure; samesite=strict`;
  },

  /**
   * Limpiar todas las cookies de autenticación
   */
  clearTokens: () => {
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';
  },

  /**
   * Obtener access token de cookies
   */
  getAccessToken: () => {
    if (typeof document === 'undefined') return null;
    const name = 'access_token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  },
};
