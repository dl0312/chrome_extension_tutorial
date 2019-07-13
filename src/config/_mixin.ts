// sizes for media queries
const sizes = {
    giant: 1720,
    desktop: 922,
    tablet: 768,
    phone: 576
  };
  
  export const PLTags = [
    "html",
    "css",
    "js",
    "react",
    "python",
    "c++",
    "swift",
    "c",
    "php",
    "java",
    "nodejs",
    "c#",
    "pascal",
    "django",
    "spring",
    "expressjs",
    "flask",
    "haskel",
    "prolog",
    "keras",
    "tenserflow",
    "kotlin",
    "scala",
    "play",
    "rubyonrails",
    "jquery",
    "vue",
    "angular"
  ];
  
  export const baseURL = "http://localhost:3000";
  
  export const fontSize = {
    smallFontSize: "9px",
    normalFontSize: "12px",
    largeFontSize: "15px"
  };
  
  export const websiteTitle = "👀 Movisualization";
  
  export const headerHeight = "6rem";
  
  export const color = {
    bgColor: "#eeeeee",
    fontColor: "#eeeeee",
    mainColor: "skyblue",
    html: "#f16524",
    css: "#1da1f2",
    js: "#fb9e21",
    react: "#61dbfb"
  };
  
  const customMediaQuery = (maxWidth: number) =>
    `@media (max-width: ${maxWidth}px)`;
  
  export const media: any = {
    custom: customMediaQuery,
    giant: customMediaQuery(sizes.giant),
    desktop: customMediaQuery(sizes.desktop),
    tablet: customMediaQuery(sizes.tablet),
    phone: customMediaQuery(sizes.phone)
  };