import { Suspense } from "react";

export function withSuspence(Component: React.ComponentType) {
  return () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
