export class SiikaStubError extends Error {
  constructor(m: string) {
    super(m);

    // Overwrite the name of the Error class.
    // 'Error' -> 'SiikaStubError'
    this.name = SiikaStubError.name;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, SiikaStubError.prototype);
  }
}
