import { Theme } from '@theme-ui/css';
export declare const toCustomProperties: (obj: Record<string, any> | undefined, parent?: string | undefined, themeKey?: string | undefined) => Record<string, any>;
export declare const objectToVars: (parent: string, obj: Record<string, any>) => Record<string, object>;
export declare const createColorStyles: (theme?: Theme) => import("@theme-ui/css").CSSObject;
