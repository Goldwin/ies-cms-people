enum LabelType {
  Name = "name",
  Security = "security",
}

class LabelTextObject {}

class LabelImageObject {}

class LabelLineObject {}

type LabelObject =
  | LabelTextObject
  | LabelImageObject
  | LabelLineObject
  | undefined;

function toLabelObject(obj: any): LabelObject {
  switch (obj.type) {
    case "text":
      return new LabelTextObject();
    case "image":
      return new LabelImageObject();
    case "horizontalLine":
      return new LabelLineObject();
    case "verticalLine":
      return new LabelLineObject();
    default:
      return undefined;
  }
}

export class Label {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _orientation: string;
  private readonly _type: LabelType;
  private readonly _paperSize: number[];
  private readonly _margin: number[];
  private readonly _objects: LabelObject[];

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get orientation(): string {
    return this._orientation;
  }

  get type(): LabelType {
    return this._type;
  }

  get paperSize(): number[] {
    return this._paperSize;
  }

  get margin(): number[] {
    return this._margin;
  }

  get objects(): LabelObject[] {
    return this._objects;
  }

  constructor({
    id,
    name,
    type,
    orientation,
    paperSize,
    margin,
    objects,
  }: {
    id: string;
    name: string;
    type: string;
    orientation: string;
    paperSize: number[];
    margin: number[];
    objects: any[];
  }) {
    this._id = id;
    this._name = name;
    this._orientation = orientation;
    this._paperSize = paperSize;
    this._type = type as LabelType;
    this._margin = margin;
    this._objects = (objects ?? []).map((object: object) => {
      return toLabelObject(object);
    });
  }
}
