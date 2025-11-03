import { MessageStream } from '../../views/chat/messages/stream/messageStream';
import { ServiceIO, StreamHandlers } from '../../services/serviceIO';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { Stream as StreamI } from '../../types/stream';
type UpsertFunc = (response?: ResponseI) => MessageStream | void;
export declare class Stream {
    static request(io: ServiceIO, body: object, messages: Messages, stringifyBody?: boolean, canBeEmpty?: boolean): Promise<void | MessageStream>;
    private static handleReadableStream;
    private static handleEventStream;
    private static handleMessage;
    private static handleError;
    private static handleClose;
    static simulate(messages: Messages, sh: StreamHandlers, result: ResponseI, io?: ServiceIO): Promise<void>;
    private static populateMessages;
    static isSimulation(stream?: StreamI): boolean;
    static isSimulatable(stream?: StreamI, respone?: ResponseI): string | false | undefined;
    private static abort;
    static upsertContent(msgs: Messages, upsert: UpsertFunc, stream?: MessageStream, resp?: ResponseI | ResponseI[]): void;
}
export {};
//# sourceMappingURL=stream.d.ts.map