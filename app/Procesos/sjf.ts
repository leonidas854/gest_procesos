// path: src/lib/algorithms/sjfAlgorithm.ts

import { Process, SJFResult } from "../../types/processsjf";

export function sjf(processes: Process[]): SJFResult {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const completed: Process[] = [];
    let currentTime = 0;

    while (sorted.length > 0) {
        const available = sorted.filter(p => p.arrivalTime <= currentTime);
        if (available.length === 0) {
            currentTime = sorted[0].arrivalTime;
            continue;
        }

        const next = available.reduce((min, p) =>
            p.burstTime < min.burstTime ? p : min
        );
        sorted.splice(sorted.indexOf(next), 1);

        next.startTime = currentTime;
        next.finishTime = currentTime + next.burstTime;
        next.waitingTime = next.startTime - next.arrivalTime;
        next.turnaroundTime = next.finishTime - next.arrivalTime;

        completed.push(next);
        currentTime = next.finishTime;
    }

    const averageWaitingTime =
        completed.reduce((sum, p) => sum + (p.waitingTime ?? 0), 0) /
        completed.length;
    const averageTurnaroundTime =
        completed.reduce((sum, p) => sum + (p.turnaroundTime ?? 0), 0) /
        completed.length;

    return { processes: completed, averageWaitingTime, averageTurnaroundTime };
}
