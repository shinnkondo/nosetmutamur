export default class Metadata {
    categories: string[]
    langs: string[]
    tags: string[]
    category_lang: { [s: string]: { [s: string]: string; } ; } 
}