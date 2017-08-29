export class SiikaStubError extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, SiikaStubError.prototype);

    // Overwrite the name of the Error class.
    // 'Error' -> 'SiikaStubError'
    this.name = this.constructor.name;
  }
}
