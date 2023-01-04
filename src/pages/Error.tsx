interface ErrorProps {
    statusCode: number;
    errorMsg: string;
}
export const Error = ({statusCode, errorMsg}: ErrorProps) => {
    return (
        <div>
            <h1>{statusCode}</h1>
            <p>{errorMsg}</p>
        </div>
    );
}