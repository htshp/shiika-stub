export class SiikaStubError extends Error {
  constructor(m: string, selfClass: any) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, selfClass.prototype);

    // Overwrite the name of the Error class.
    // 'Error' -> 'SiikaStubError'
    this.name = this.constructor.name;
  }
}

export class InvalidPathError extends SiikaStubError {
  constructor(value: any) {
    super(
      `Invalid stub path.
/api/v2/users/'${value}'
               ^`,
      InvalidPathError);
  }
}
