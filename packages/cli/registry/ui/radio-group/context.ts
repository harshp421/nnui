export const RADIO_GROUP_CTX = Symbol("RADIO_GROUP_CTX");

export interface RadioGroupContext {
	size: "sm" | "md" | "lg";
	value: string;
	name?: string;
	select: (value: string) => void;
}
