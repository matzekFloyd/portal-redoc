import { useEffect } from "react";

type ApiKeyOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type RedocFromParentMessage = {
    type: "portal.data";
    baseApiUrl: string;
    apiKeys: {
        loading: boolean;
        error: string;
        options: ApiKeyOption[];
    };
}

export function useParentMessage<T>(expectedMessageType: string, onMessageReceived: (data: T) => void) {
    useEffect(() => {
        const targetOrigin = window.location.origin;

        const handleMessage = (event: MessageEvent) => {
            // Validate message origin
            if (event.origin !== targetOrigin) {
                return;
            }

            // Validate message type
            if (!event.data || event.data.type !== expectedMessageType) {
                return;
            }

            // Pass the relevant data to the callback
            onMessageReceived(event.data);
        };

        // Set up event listener
        window.addEventListener("message", handleMessage);

        // Notify parent that we're ready to receive messages
        window.parent.postMessage({ type: "redoc.ready" }, targetOrigin);

        // Clean up on unmount
        return () => window.removeEventListener("message", handleMessage);
    }, []);
}
