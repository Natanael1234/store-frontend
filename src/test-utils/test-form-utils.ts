export function testForm(form: HTMLFormElement, length: number) {
  expect(form).toBeInstanceOf(HTMLFormElement);
  expect(form.children).toBeInstanceOf(HTMLCollection);
  expect(form.children).toHaveSize(length);
}

export function testFormField(
  field: Element,
  options: {
    label: string;
    value: any;
    type: string;
    autocomplete?: string;
  }
) {
  expect(field?.tagName).toEqual('MAT-FORM-FIELD');
  expect(field.children).toBeInstanceOf(HTMLCollection);
  expect(field.children).toHaveSize(2);
  const nameLabelWrapper = field.children[0] as HTMLElement;
  expect(nameLabelWrapper?.tagName).toEqual('DIV');

  // label
  const labelElement = field.querySelector(
    'div.mat-mdc-form-field-flex label mat-label'
  );
  expect(labelElement).toBeDefined();

  const label = labelElement?.textContent;

  expect(label).toEqual(options.label);

  // input
  const inputs = field.querySelectorAll('input');
  expect(inputs).toBeInstanceOf(NodeList);
  expect(inputs).toHaveSize(1);
  const input = inputs[0] as any;
  expect(input).toBeInstanceOf(HTMLInputElement);

  expect(input.value).toEqual(options.value);

  expect(input.type).toEqual(options.type);

  if (options.autocomplete != undefined) {
    expect(input.autocomplete).toEqual(options.autocomplete);
  }
}

export function testCheckbox(
  checkbox: Element,
  options: {
    label: string;
    checked: boolean;
  }
) {
  expect(checkbox?.tagName).toEqual('MAT-CHECKBOX');
  expect(checkbox.children).toBeInstanceOf(HTMLCollection);
  expect(checkbox.children).toHaveSize(1);

  // label
  const labels = checkbox.querySelectorAll('label');
  expect(labels).toBeInstanceOf(NodeList);
  expect(labels).toHaveSize(1);
  const label = labels[0];
  expect(label).toBeInstanceOf(HTMLLabelElement);
  expect(label.textContent).toEqual(options.label);

  // input
  const inputs = checkbox.querySelectorAll('input');
  expect(inputs).toBeInstanceOf(NodeList);
  expect(inputs).toHaveSize(1);
  const input = inputs[0] as any;
  expect(input).toBeInstanceOf(HTMLInputElement);

  expect(input.type).toEqual('checkbox');
  expect(input.checked).toEqual(options.checked);
}

export function testButton(
  button: HTMLButtonElement,
  options: {
    label: string;
    type: 'reset' | 'submit' | 'button';
    color?: 'accent' | 'primary' | null;
  }
) {
  expect(button).toBeInstanceOf(HTMLButtonElement);
  expect(button.textContent).toEqual(options.label);

  if (options.color) {
    expect(button.getAttribute('color')).toEqual(options.color);
  }

  if (options.type !== null) {
    expect(button.type).toEqual(options.type);
  }
}
