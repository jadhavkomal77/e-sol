import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function RouteWrapper({ children, Fallback }) {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
