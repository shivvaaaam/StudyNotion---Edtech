const BASE_URL = process.env.REACT_APP_BASE_URL   // Fallback to default

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
}

export const endPoints = {
    RESETPASSTOKEN_API: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/reset-password-token`,
    RESETPASSWORD_API: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/reset-password`,
  };
  
  