export interface CalloutStep {
    targetId: string;
    dir: string;
    align: string;
    title: string;
    text: string;
}

export class CalloutController {

    private steps: CalloutStep[];
    private currentStepIndex: number;

    constructor(steps: CalloutStep[]) {
        this.steps = steps;
        this.currentStepIndex = 0;
    }

    getCurrentStep(): CalloutStep {
        return this.steps[this.currentStepIndex];
    }

    getCurrentStepIndex(): number {
        return this.currentStepIndex;
    }

    nextStep(): void {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
        }
    }

    prevStep(): void {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
        }
    }

    reset(): void {
        this.currentStepIndex = 0;
    }

    isFirstStep(): boolean {
        return this.currentStepIndex === 0;
    }

    isLastStep(): boolean {
        return this.currentStepIndex === this.steps.length - 1;
    }

}
