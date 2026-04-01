/**
 * Toast State Management using Svelte 5 Runes
 * Singleton pattern for managing toast notifications globally
 */

export type ToastVariant = 'default' | 'brand' | 'success' | 'destructive' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type ToastMode = 'inline' | 'expanded';

export interface ToastData {
    id: string;
    title?: string;
    description?: string;
    variant?: ToastVariant;
    mode?: ToastMode;
    duration?: number;
    dismissible?: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
    onDismiss?: () => void;
}

interface ToastState extends ToastData {
    timeoutId?: ReturnType<typeof setTimeout>;
    pausedAt?: number;
    remainingTime?: number;
}

class ToastManager {
    private toasts = $state<ToastState[]>([]);
    private counter = 0;

    get items() {
        return this.toasts;
    }

    private generateId(): string {
        return `toast-${Date.now()}-${++this.counter}`;
    }

    add(data: Omit<ToastData, 'id'>): string {
        const id = this.generateId();
        const duration = data.duration ?? 5000;
        const dismissible = data.dismissible ?? true;

        const toast: ToastState = {
            id,
            ...data,
            duration,
            dismissible,
            remainingTime: duration
        };

        // Auto-dismiss if duration is set and not 0 (0 means persist)
        if (duration > 0) {
            toast.timeoutId = setTimeout(() => {
                this.dismiss(id);
            }, duration);
        }

        this.toasts = [...this.toasts, toast];
        return id;
    }

    dismiss(id: string): void {
        const toast = this.toasts.find((t) => t.id === id);
        if (toast) {
            if (toast.timeoutId) {
                clearTimeout(toast.timeoutId);
            }
            toast.onDismiss?.();
            this.toasts = this.toasts.filter((t) => t.id !== id);
        }
    }

    dismissAll(): void {
        this.toasts.forEach((toast) => {
            if (toast.timeoutId) {
                clearTimeout(toast.timeoutId);
            }
            toast.onDismiss?.();
        });
        this.toasts = [];
    }

    pause(id: string): void {
        const toast = this.toasts.find((t) => t.id === id);
        if (toast && toast.timeoutId && !toast.pausedAt) {
            clearTimeout(toast.timeoutId);
            toast.pausedAt = Date.now();
        }
    }

    resume(id: string): void {
        const toast = this.toasts.find((t) => t.id === id);
        if (toast && toast.pausedAt && toast.remainingTime) {
            const elapsed = Date.now() - toast.pausedAt;
            toast.remainingTime = Math.max(0, toast.remainingTime - elapsed);
            toast.pausedAt = undefined;

            if (toast.remainingTime > 0) {
                toast.timeoutId = setTimeout(() => {
                    this.dismiss(id);
                }, toast.remainingTime);
            } else {
                this.dismiss(id);
            }
        }
    }

    // Helper methods for common variants
    success(message: string, options?: Partial<Omit<ToastData, 'id' | 'variant' | 'description'>>): string {
        return this.add({
            description: message,
            variant: 'success',
            ...options
        });
    }

    error(message: string, options?: Partial<Omit<ToastData, 'id' | 'variant' | 'description'>>): string {
        return this.add({
            description: message,
            variant: 'destructive',
            ...options
        });
    }

    warning(message: string, options?: Partial<Omit<ToastData, 'id' | 'variant' | 'description'>>): string {
        return this.add({
            description: message,
            variant: 'warning',
            ...options
        });
    }

    info(message: string, options?: Partial<Omit<ToastData, 'id' | 'variant' | 'description'>>): string {
        return this.add({
            description: message,
            variant: 'info',
            ...options
        });
    }

    // Custom toast with full control over all properties
    custom(options: Omit<ToastData, 'id'>): string {
        return this.add(options);
    }
}

// Export singleton instance
export const toast = new ToastManager();
