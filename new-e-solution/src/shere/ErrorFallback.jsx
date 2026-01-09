import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return <>

        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center p-5 border border-danger border-2 rounded shadow-sm bg-white" style={{ maxWidth: '400px', width: '100%' }}>
                <h4 className="mb-3">Something Went Wrong</h4>
                <p className="text-success mb-4">{error.message}</p>
                <button
                    className="btn btn-outline-primary w-100"
                    onClick={resetErrorBoundary}
                >
                    Try Again
                </button>
            </div>
        </div>
    </>
};

export default ErrorFallback;
