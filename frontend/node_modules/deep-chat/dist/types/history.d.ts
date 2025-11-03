import { MessageContent } from './messages';
export type HistoryMessage = MessageContent | false;
export type LoadHistory = (index: number) => HistoryMessage[] | Promise<HistoryMessage[]>;
//# sourceMappingURL=history.d.ts.map