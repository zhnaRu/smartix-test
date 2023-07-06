import { pascalCaseToCamelCase } from '@/utils/pascalCaseToCamelCase';

export class StepColorEnumValue {
  label = '';

  color = '';

  key: string | null = null;

  static readonly blue = new StepColorEnumValue('Синий', '#0000ff', 'Blue');

  static readonly green = new StepColorEnumValue('Зеленый', '#00ff00', 'Green');

  static readonly red = new StepColorEnumValue('Красный', '#ff0000', 'Red');

  static readonly yellow = new StepColorEnumValue('Желтый', '#FFFF00', 'Yellow');

  static readonly brown = new StepColorEnumValue('Коричневый', '#804030', 'Brown');

  static readonly purple = new StepColorEnumValue('Фиолетовый', '#800080', 'Purple');

  static readonly gray = new StepColorEnumValue('Серый', '#808080', 'Gray');

  static readonly lime = new StepColorEnumValue('Лайм', '#ccff00', 'Lime');

  static readonly noEnum = new StepColorEnumValue('Енум н/д', '#ffffff', null);

  static readonly list = [
    StepColorEnumValue.blue,
    StepColorEnumValue.green,
    StepColorEnumValue.red,
    StepColorEnumValue.yellow,
    StepColorEnumValue.brown,
    StepColorEnumValue.purple,
    StepColorEnumValue.gray,
    StepColorEnumValue.lime,
  ];

  constructor(
    label: string,
    color: string,
    key: string | null,
  ) {
    this.label = label;
    this.color = color;
    this.key = key;
  }

  static getEnumByKey(key: string): StepColorEnumValue {
    const keyCamelCase: string = pascalCaseToCamelCase(key);
    const enumVal: WorkFlowStatusEnum = this[keyCamelCase];
    return enumVal || StepColorEnumValue.noEnum;
  }
}
