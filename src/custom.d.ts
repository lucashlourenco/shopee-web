// custom.d.ts or images.d.ts

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}
// Add other file types as needed, like '*.jpeg', '*.gif', etc.