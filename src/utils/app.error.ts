/**
 * Common parent for all error
 */
export default class AppError extends Error {
  constructor(message?: string, public readonly code?: string | number, public readonly context?: string) {
    super(message);
  }
}
