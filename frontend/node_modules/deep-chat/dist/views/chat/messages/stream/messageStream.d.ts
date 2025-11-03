import { MessageFile } from '../../../../types/messageFile';
import { Messages } from '../messages';
import { Response } from '../../../../types/response';
import { Stream } from '../../../../types/stream';
import { MessagesBase } from '../messagesBase';
export declare class MessageStream {
    static readonly MESSAGE_CLASS = "streamed-message";
    private static readonly PARTIAL_RENDER_TEXT_MARK;
    private readonly allowScroll;
    private readonly _partialRender?;
    private readonly _messages;
    private _fileAdded;
    private _streamType;
    private _elements?;
    private _hasStreamEnded;
    private _activeMessageRole?;
    private _message?;
    private _endStreamAfterOperation?;
    private _partialText;
    private _partialBubble?;
    private _targetWrapper?;
    constructor(messages: MessagesBase, stream?: Stream);
    private static isFocusModeScrollAllowed;
    upsertStreamedMessage(response?: Response): void;
    private setInitialState;
    private setTargetWrapperIfNeeded;
    private updateBasedOnType;
    private updateText;
    private isNewPartialRenderParagraph;
    private shouldCreateNewParagraph;
    private partialRenderNewParagraph;
    private partialRenderBubbleUpdate;
    private updateHTML;
    finaliseStreamedMessage(): void;
    markFileAdded(): void;
    endStreamAfterFileDownloaded(messages: Messages, downloadCb: () => Promise<{
        files?: MessageFile[];
        text?: string;
    }>): Promise<void>;
}
//# sourceMappingURL=messageStream.d.ts.map