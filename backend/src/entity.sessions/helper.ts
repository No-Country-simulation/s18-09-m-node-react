import { getById } from '../entity.techniques/service/get';
import { cycle } from './model';

interface Technique {
  focus_time: number;
  break_time: number;
  long_break_time: number;
  cycles_before_long_break: number;
}

interface CycleTimings {
  cycle_time: number;
  complete_cycle_time: number;
}

interface TimeDistribution {
  total_rounded_cycles: number;
  remainingTime: number;
  remainingCycles: number;
  extraTime: number;
}

interface Schedule {
  schedule: cycle[];
  break_count: number;
}

export class SessionHelper {
  private constructor() {}

  private static addMinutesToTime(time: string, minutes: number): string {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;

    const normalizedHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    return `${String(normalizedHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }

  public static getTotalExpectedTime(start_time: Date, end_time: Date): number {
    const MINUTES_CONVERSION = 1000 * 60;
    return Math.floor((end_time.getTime() - start_time.getTime()) / MINUTES_CONVERSION);
  }

  public static dateConverter(dateTime: any): Date {
    const date = new Date(dateTime);
    date.setHours(date.getHours() - 3);
    return date;
  }

  private static async getTechnique(technique_id: string): Promise<Technique> {
    const technique = await getById(technique_id);
    if (!technique) {
      throw new Error('Technique not found');
    }
    return technique;
  }

  private static calculateCycleTimings(technique: Technique): CycleTimings {
    const { focus_time, break_time, cycles_before_long_break, long_break_time } = technique;
    return {
      cycle_time: focus_time + break_time,
      complete_cycle_time: cycles_before_long_break * (focus_time + break_time) + focus_time + long_break_time,
    };
  }

  private static calculateTimeDistribution(expected_total_time: number, cycle_time: number, complete_cycle_time: number): TimeDistribution {
    const total_rounded_cycles = Math.floor(expected_total_time / complete_cycle_time);
    const remainingTime = expected_total_time % complete_cycle_time;
    const remainingCycles = Math.floor(remainingTime / cycle_time);
    const extraTime = remainingTime - remainingCycles * cycle_time;

    return {
      total_rounded_cycles,
      remainingTime,
      remainingCycles,
      extraTime,
    };
  }

  public static async getExpectedFocusTime(technique_id: string, expected_total_time: number): Promise<number> {
    const technique = await this.getTechnique(technique_id);
    const { cycle_time, complete_cycle_time } = this.calculateCycleTimings(technique);
    const timeDistribution = this.calculateTimeDistribution(expected_total_time, cycle_time, complete_cycle_time);

    let total_focus_slots = timeDistribution.total_rounded_cycles * (technique.cycles_before_long_break + 1);

    if (timeDistribution.remainingTime > 0) {
      total_focus_slots += timeDistribution.remainingCycles;

      if (timeDistribution.extraTime >= technique.focus_time) {
        total_focus_slots++;
      }
    }

    return total_focus_slots * technique.focus_time;
  }

  public static async getExpectedBreakTime(technique_id: string, expected_total_time: number): Promise<number> {
    const technique = await this.getTechnique(technique_id);
    const { cycle_time, complete_cycle_time } = this.calculateCycleTimings(technique);
    const timeDistribution = this.calculateTimeDistribution(expected_total_time, cycle_time, complete_cycle_time);

    let total_break_time =
      timeDistribution.total_rounded_cycles * (technique.cycles_before_long_break * technique.break_time + technique.long_break_time);

    if (timeDistribution.remainingTime > 0) {
      total_break_time += timeDistribution.remainingCycles * technique.break_time;

      if (timeDistribution.extraTime >= technique.focus_time + technique.break_time) {
        total_break_time += technique.break_time;
      }
    }

    return total_break_time;
  }

  public static async generateSchedule(technique_id: string, start_time: string, expected_total_time: number): Promise<Schedule> {
    const technique = await this.getTechnique(technique_id);
    const schedule: cycle[] = [];
    let currentTime = start_time;
    let remainingTime = expected_total_time;
    let cycleCount = 0;

    while (remainingTime > 0) {
      const workEndTime = this.addMinutesToTime(currentTime, technique.focus_time);

      cycleCount++;
      const isLongBreak = cycleCount % (technique.cycles_before_long_break + 1) === 0;
      const breakDuration = isLongBreak ? technique.long_break_time : technique.break_time;

      schedule.push({
        start_working: currentTime,
        break_time: {
          time: workEndTime,
          isLongBreak,
        },
      });

      remainingTime -= technique.focus_time + breakDuration;
      currentTime = this.addMinutesToTime(workEndTime, breakDuration);
    }

    return {
      schedule,
      break_count: cycleCount, 
    };
  }

  public static extractTimeFromISO(isoDate: Date): string {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
}
