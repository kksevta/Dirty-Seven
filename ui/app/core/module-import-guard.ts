export function throwErrorIfAlreadyLoaded(parentModule: any, moduleName: any) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}
