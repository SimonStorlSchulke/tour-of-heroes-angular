export interface Hero {
    id: number;
    name: string;
    level: number;
    weapon?: string;
    attackDamage: number;
    maxHealth: number;
    currentHealth: number;
}