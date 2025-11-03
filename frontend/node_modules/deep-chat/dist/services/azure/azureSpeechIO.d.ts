import { DirectServiceIO } from '../utils/directServiceIO';
import { BuildHeadersFunc } from '../../types/headers';
import { ServiceFileTypes } from '../serviceIO';
import { APIKey } from '../../types/APIKey';
import { DeepChat } from '../../deepChat';
export declare class AzureSpeechIO extends DirectServiceIO {
    protected static readonly REGION_ERROR_PREFIX = "Please define a region config property. [More Information](https://deepchat.dev/docs/directConnection/Azure#";
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    constructor(deepChat: DeepChat, buildHeadersFunc: BuildHeadersFunc, region: string, apiKey?: APIKey, existingFileTypes?: ServiceFileTypes);
}
//# sourceMappingURL=azureSpeechIO.d.ts.map