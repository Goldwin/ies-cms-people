declare module "file-saver" {
  function saveAs(blob: Blob, name: string): void;
  namespace saveAs {}
  export = saveAs;
}
