// path: src/types/process.ts
export interface Process {
    id: string;
    arrivalTime: number;
    burstTime: number;
    startTime?: number;
    finishTime?: number;
    waitingTime?: number;
    turnaroundTime?: number;
}

export interface SJFResult {
    processes: Process[];
    averageWaitingTime: number;
    averageTurnaroundTime: number;
}
