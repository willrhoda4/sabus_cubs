





/// <reference types="vite/client" />


// vite-env.d.ts
declare module '*.svg?react' {
    import React from 'react';
    const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default content;
}