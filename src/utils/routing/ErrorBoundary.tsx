import React, { ReactNode, ReactElement } from "react";

interface ErrorBoundaryProps {
  fallback: ({ error }: { error?: Error }) => ReactElement;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: undefined };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // TODO: Send error to error tracking service if available to afalsani.com
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback({ error: this.state.error });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
