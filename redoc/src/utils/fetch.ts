import { useEffect, useReducer, useState } from 'react';

type FetchState<T> = {
    data: null;
    response: null;
    loading: true;
    error: null;
} | {
    data: null;
    response: null | Response;
    loading: false;
    error: Error;
} | {
    data: T;
    response: Response;
    loading: false;
    error: null;
};

type FetchAction<T> = {
    type: 'FETCHING';
} | {
    type: 'FETCHED';
    data: T;
    response: Response;
} | {
    type: 'ERROR';
    error: Error;
    response: Response | null;
};

export type FetchStateAction<T> = FetchState<T> & {
    changeUrl: (url: string) => void;
};

export type OptionsForHook = {
    successStatuses?: number[];
};

function reducer<T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> {
    switch (action.type) {
        case 'FETCHING':
            return state.loading ? state : { data: null, loading: true, error: null, response: null };
        case 'FETCHED':
            return { data: action.data, loading: false, error: null, response: action.response };
        case 'ERROR':
            return { data: null, loading: false, error: action.error, response: action.response };
        default:
            return state;
    }
}

const defaultSuccessStatuses = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];

const backendBaseUrl = "/eva/portal/api";

export function useFetch<T>(initialUrl: string = "", options?: RequestInit, hookOptions?: OptionsForHook): FetchStateAction<T> {
    const [state, dispatch] = useReducer<React.Reducer<FetchState<T>, FetchAction<T>>>(reducer<T>, {
        data: null,
        loading: true,
        error: null,
        response: null
    });
    const [url, setUrl] = useState<string>(backendBaseUrl + initialUrl);

    const hookOptionsWithDefaults = {
        successStatuses: defaultSuccessStatuses,
        ...hookOptions
    };

    useEffect(() => {
        const controller = new AbortController()
        if (!url.length) {
            return;
        }

        async function fetchUrl() {
            try {
                dispatch({ type: 'FETCHING' });
                const response = await fetch(url, { signal: controller.signal, ...options });
                if (!hookOptionsWithDefaults.successStatuses.includes(response.status)) {
                    dispatch({ type: 'ERROR', error: new Error(`response status ${response.status} not in successStatuses`), response: null });
                    return;
                }
                const json = await response.json();
                dispatch({ type: 'FETCHED', data: json, response });
            } catch (responseError) {
                dispatch({ type: 'ERROR', error: responseError as Error, response: null });
            }
        }

        fetchUrl();

        return () => {
            controller.abort();
        };
    }, [url, options, hookOptionsWithDefaults.successStatuses]);

    return {
        ...state,
        changeUrl: setUrl
    };
}

