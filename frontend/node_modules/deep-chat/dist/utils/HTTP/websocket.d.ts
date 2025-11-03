import { MessageStream } from '../../views/chat/messages/stream/messageStream';
import { Messages } from '../../views/chat/messages/messages';
import { ServiceIO } from '../../services/serviceIO';
import { Response } from '../../types/response';
export type RoleToStream = {
    [role: string]: MessageStream;
};
export declare class Websocket {
    static setup(io: ServiceIO): void;
    private static isElementPresentInDOM;
    static createConnection(io: ServiceIO, messages: Messages): void;
    private static retryConnection;
    private static assignListeners;
    static sendWebsocket(io: ServiceIO, body: object, messages: Messages, stringifyBody?: boolean): Promise<void>;
    static canSendMessage(websocket: ServiceIO['websocket']): boolean;
    private static isWebSocket;
    static stream(io: ServiceIO, messages: Messages, roleToStream: RoleToStream, result?: Response): void;
}
//# sourceMappingURL=websocket.d.ts.map