import * as React from 'react';

type ReturnToDocumentationProps = {
  height?: number;
  width?: number;
  viewBox?: string;
  onClick?: () => void;
};

/**
 *
 * @param props
 * @constructor
 */
export function ReturnToDocumentation(props: ReturnToDocumentationProps) {
    const { height, width, viewBox, onClick } = props;
    return (
        <p className={'return-to-documentation'}>
            <span className={'return-to-documentation-action'} onClick={onClick}>
                <svg
                    className={"return-to-documentation-icon"}
                    fill="none"
                    height={height ? height : '12'}
                    viewBox={viewBox ? viewBox : '0 0 12 22'}
                    width={width ? width : '8'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="m1.00021 21.9877c.2652 0 .51951-.1054.707-.293l9.99999-10c.1875-.1875.2928-.4418.2928-.707s-.1053-.5195-.2928-.707l-9.99999-9.999988c-.1886-.1821583-.4412-.28295262-.7034-.2806742-.262194.00227842-.513007.1074472-.698415.2928552s-.2905778.436221-.2928561.698417c-.0022783.2622.0985151.5148.2806741.7034l9.292997 9.29299-9.292997 9.293c-.13981.1399-.235015.318-.2735826.512-.0385675.1939-.01876446.395.0569058.5777.0756698.1827.2038098.3388.3682198.4487.164409.1099.357708.1686.555454.1686z"
                        fill="#373a36"
                    />
                </svg>
                <span>
                    Back to documentation
                </span>
            </span>
        </p>
    );
}
