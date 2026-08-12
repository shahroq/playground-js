// no abstraction
interface Schema<T> {
  parse(input: unknown): T;
}

// string
const string = (): Schema<string> => ({
  parse(input) {
    if (typeof input !== "string") {
      throw new Error("Expected string");
    }

    return input;
  },
});
const name = "john";
const Name = string();
const _parsedName = Name.parse("John");

// number
const number = (): Schema<number> => ({
  parse(input) {
    if (typeof input !== "number") {
      throw new Error("Expected number");
    }

    return input;
  },
});

// object
type Infer<T extends Schema<unknown>> = T extends Schema<infer U> ? U : never;

type InferShape<T extends Record<string, Schema<unknown>>> = {
  [K in keyof T]: Infer<T[K]>;
};

export const object = <T extends Record<string, Schema<unknown>>>(
  shape: T,
): Schema<InferShape<T>> => ({
  parse(input: unknown) {
    if (typeof input !== "object" || input === null) {
      throw new Error("Expected object");
    }

    for (const key of Object.keys(shape)) {
      const schema = shape[key];

      schema.parse((input as Record<string, unknown>)[key]);
    }

    return input as InferShape<T>;
  },
});

const User = object({
  name: string(),
  age: number(),
});

const user = { name: "sh", age: 12 };

const _parsedUser = User.parse(user);
