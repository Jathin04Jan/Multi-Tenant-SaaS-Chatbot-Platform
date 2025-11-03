import { Messages } from '../../views/chat/messages/messages';
import { ServiceIO } from '../../services/serviceIO';
export declare class Demo {
    static readonly URL = "deep-chat-demo";
    private static generateResponse;
    private static getCustomResponse;
    private static getResponse;
    static request(io: ServiceIO, messages: Messages): void;
    static requestStream(messages: Messages, io: ServiceIO): void;
}
//# sourceMappingURL=demo.d.ts.map