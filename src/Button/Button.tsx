import React from 'react';
import { Button as AntdButton } from 'antd';
import { omitProps } from 'mytils';
import Icon from '../Icon/Icon';
import { GroupType, IButtonProps } from './Button.type';

const { Group } = AntdButton;
const InternalButton: React.ForwardRefRenderFunction<unknown, IButtonProps> = (props: IButtonProps, ref): React.ReactElement => {
  const { group } = props;
  return !group ? (
    <AntdButton {...props}>{props.children}</AntdButton>
  ) : (
    <Group>
      {group?.map((item: GroupType, index: number) => {
        return (
          <AntdButton
            key={item.key || index}
            {...omitProps(['size', 'style', 'className', 'prefixCls', 'group', 'onClick'], props)}
            onClick={(e) => props.onClick?.({ ...e, ...{ value: group[index].value } })}
            type={item.type || props.type}>
            {item.leftIconType ? <Icon type={item?.leftIconType} /> : null}
            {item.text}
            {item.rightIconType ? <Icon type={item?.rightIconType} /> : null}
          </AntdButton>
        );
      })}
    </Group>
  );
};

interface compositedComponent extends React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
}
const Button = React.forwardRef(InternalButton);
(Button as compositedComponent).Group = Group;
export default Button;
