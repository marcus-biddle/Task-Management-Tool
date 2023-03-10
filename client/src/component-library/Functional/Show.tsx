import { ReactNode } from 'react';
import { showIf } from '../../helpers/conditionals';

interface ShowProps {
  children: ReactNode;
  when: any;
}

const Show = ({ children, when }: ShowProps) => showIf(when)(children);

Show.defaultProps = {
  children: null,
  when: false
};

export default Show;