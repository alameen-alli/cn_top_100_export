// Type definitions for Connect Nigeria Top 100 JSON data
export interface JsonPerson {
    name: string;
    achievement: string;
    image: string;
    company?: string;
    title?: string;
    work?: string;
    focus?: string;
}

export interface JsonCategory {
    category: string;
    people: JsonPerson[];
}

export interface JsonPersonOfTheYear {
    name: string;
    category: string;
    description: string;
    image: string;
}

export interface ConnectNigeriaTop100Data {
    title: string;
    year: number;
    description: string;
    personOfTheYear: JsonPersonOfTheYear;
    categories: JsonCategory[];
}
