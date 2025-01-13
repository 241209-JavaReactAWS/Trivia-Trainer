export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
}