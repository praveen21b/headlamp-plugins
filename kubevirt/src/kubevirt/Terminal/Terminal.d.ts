import '@xterm/xterm/css/xterm.css';
import { StreamResultsCb } from '@kinvolk/headlamp-plugin/lib/ApiProxy';
import { DialogProps } from '@mui/material/Dialog';

interface ConsoleItem {
  exec: (onExec: StreamResultsCb) => { cancel: () => void; getSocket: () => WebSocket };
  getName: () => string;
}
interface TerminalProps extends DialogProps {
  item: ConsoleItem;
  onClose?: () => void;
}
export default function Terminal(props: TerminalProps): import('react/jsx-runtime').JSX.Element;
export {};
