import { Fragment } from 'react';

export type LabelFactory = (value: string) => [React.ReactNode, { [prop: string]: any } | null | undefined] | [React.ReactNode];

export interface RadioGroupProps {
  name: string;
  values: string[];
  defaultValue?: string;
  required?: boolean;
  labelFactory?: LabelFactory;
  [prop: string]: any;
}

export default function RadioGroup({ name, values, defaultValue, required, labelFactory = value => [value], ...props }: RadioGroupProps) {
  const optionName = `${name}-option`;
  return (
    <div
      id={`${name}-options`}
      {...props}
      className={`radio-group ${props.className ?? ''}`.trim()}
    >
      {values.map(value => {
        const optionId = `${name}-option-${value}`;
        const [labelContent, labelProps] = labelFactory(value);
        return (
          <Fragment
            key={optionId}
          >
            <input
              type='radio'
              id={optionId}
              name={optionName}
              value={value}
              required={required}
              defaultChecked={value === defaultValue}
            />
            <label
              {...(labelProps ?? {})}
              htmlFor={optionId}
            >
              {labelContent}
            </label>
          </Fragment>
        );
      })}
    </div>
  );
}
