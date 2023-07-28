const ActiveCSS=require("./active/ActiveCSS");
const ActiveHead=require("./active/ActiveHead");
const ActiveJS=require("./active/ActiveJS");
const ActiveRender=require("./active/ActiveRender");
const ActiveMultiRender=require("./active/ActiveMultiRender");
const ActiveScript=require("./active/ActiveScript");
const Combine=require("./basic/Combine");
const Link=require("./basic/Link");
const MergeProps=require("./basic/MergeProps");
const ParseArgs=require("./basic/ParseArgs");
const importCSS=require("./import/importCSS");
const importJS=require("./import/importJS");
const importMVar=require("./import/importMVar");
const importVar=require("./import/importVar");
const insertHTML=require("./insert/insertHTML");
const LoadCSS=require("./load/LoadCSS");
const LoadJS=require("./load/LoadJS");
const reportCSS=require("./report/reportCSS");
const reportJS=require("./report/reportJS");
const RegisterTouchAction=require("./touch/RegisterTouchAction");
const useCSS=require("./use/useCSS");
const useFormat=require("./use/useFormat");
const useFormatter=require("./use/useFormatter");
const useHead=require("./use/useHead");
const useJS=require("./use/useJS");
const useMarkdown=require("./use/useMarkdown");
const useMCSS=require("./use/useMCSS");
const useMJS=require("./use/useMJS");
const useMSASS=require("./use/useMSASS");
const useNoHelp=require("./use/useNoHelp");
const usePlugin=require("./use/usePlugin");
const useProduction=require("./use/useProduction");
const useSASS=require("./use/useSASS");
const useStaticPage=require("./use/useStaticPage");
const launchpad=require("./launchpad");
const html=require("./base/index")

module.exports={
    ActiveCSS,
    ActiveHead,
    ActiveJS,
    ActiveRender,
    ActiveMultiRender,
    ActiveScript,
    Combine,
    Link,
    MergeProps,
    ParseArgs,
    importCSS,
    importJS,
    importMVar,
    importVar,
    insertHTML,
    LoadCSS,
    LoadJS,
    reportCSS,
    reportJS,
    RegisterTouchAction,
    useCSS,
    useFormat,
    useFormatter,
    useHead,
    useJS,
    useMarkdown,
    useMCSS,
    useMJS,
    useMSASS,
    useNoHelp,
    usePlugin,
    useProduction,
    useSASS,
    useStaticPage,
    launchpad,
    html,
    base: html
}