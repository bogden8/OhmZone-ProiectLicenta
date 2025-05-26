export function getCurrentUser() {
    const token = localStorage.getItem('oz_token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.nameid || payload.sub,
            username: payload.unique_name || payload.username || payload.email,
            role: payload.role || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        };
    } catch (e) {
        console.error('Eroare la decodarea tokenului:', e);
        return null;
    }
}
