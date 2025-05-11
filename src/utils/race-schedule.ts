/**
 * Utilities for creating human-readable race schedule descriptions
 * from iRacing API race_time_descriptors objects
 */

interface RaceTimeDescriptor {
  dayOffset: number[];
  firstSessionTime: string;
  repeatMinutes?: number;
  repeating: boolean;
  sessionMinutes: number;
  startDate: string;
  superSession: boolean;
}

/**
 * Creates a human-readable description of a race schedule
 * @param descriptor The race time descriptor object from the iRacing API
 * @param timezoneOffsetMinutes Optional timezone offset in minutes (positive for east of UTC, negative for west)
 * @returns A string with a human-readable schedule description
 */
export function createReadableSchedule(
  descriptor: RaceTimeDescriptor, 
  timezoneOffsetMinutes: number = 0
): string {
  // Get the start time in a readable format and adjust for timezone
  const startTime = descriptor.firstSessionTime.substring(0, 5);
  let [hours, minutes] = startTime.split(':').map(Number);
  
  // Apply timezone offset
  const totalMinutes = hours * 60 + minutes + timezoneOffsetMinutes;
  hours = Math.floor(totalMinutes / 60) % 24; // Ensure hours wrap around 24
  minutes = totalMinutes % 60;
  
  // Handle non-repeating special events
  if (!descriptor.repeating) {
    return createNonRepeatingScheduleDescription(descriptor, hours, minutes, timezoneOffsetMinutes);
  }
  
  // Handle repeating races
  const repeatMinutes = descriptor.repeatMinutes || 0;
  
  // For repeating events, we need to determine the pattern
  if (isEveryDayPattern(descriptor.dayOffset)) {
    // Daily races (offsets 0,1,2,3,4,5,6 from start date)
    return createDailyScheduleDescription(hours, minutes, repeatMinutes);
  } else if (isWeeklyPattern(descriptor.dayOffset)) {
    // Weekly races (offsets with consistent 7-day intervals)
    return createWeeklyScheduleDescription(descriptor, hours, minutes, repeatMinutes);
  } else if (descriptor.dayOffset.length === 1) {
    // Single day races
    return `Races on ${formatDate(descriptor.startDate, descriptor.dayOffset[0])}, ${createTimePattern(hours, minutes, repeatMinutes)}`;
  } else {
    // Multiple specific days
    return createMultipleDaysScheduleDescription(descriptor, hours, minutes, repeatMinutes, timezoneOffsetMinutes);
  }
}

/**
 * Determines if the dayOffset array represents an every-day pattern
 */
function isEveryDayPattern(dayOffsets: number[]): boolean {
  if (dayOffsets.length !== 7) return false;
  
  // Check if it's a consecutive sequence from 0-6
  for (let i = 0; i < 7; i++) {
    if (!dayOffsets.includes(i)) return false;
  }
  
  return true;
}

/**
 * Determines if the dayOffset array represents a weekend pattern
 */
function isWeekendPattern(dayOffsets: number[]): boolean {
  // Simple check for weekend days (assuming 5,6 are Sat/Sun from start date)
  // This is a simplification and might need adjustment based on actual start date
  if (dayOffsets.length < 2) return false;
  
  // Check if the pattern contains weekend days
  const hasWeekendDays = dayOffsets.some(d => d % 7 === 5 || d % 7 === 6);
  const onlyWeekendDays = dayOffsets.every(d => d % 7 === 5 || d % 7 === 6);
  
  return hasWeekendDays && (onlyWeekendDays || dayOffsets.length <= 4);
}

/**
 * Determines if the dayOffset array represents a weekly pattern
 */
function isWeeklyPattern(dayOffsets: number[]): boolean {
  if (dayOffsets.length <= 1) return false;
  
  // Check if all offsets are multiples of 7 from some base day
  const baseDays = new Set(dayOffsets.map(d => d % 7));
  return baseDays.size === 1 || (baseDays.size <= 2 && dayOffsets.length >= 3);
}

/**
 * Creates a description for non-repeating special events
 */
function createNonRepeatingScheduleDescription(
  descriptor: RaceTimeDescriptor, 
  hours: number, 
  minutes: number,
  timezoneOffsetMinutes: number = 0
): string {
  // Calculate specific dates
  const dates = descriptor.dayOffset.map(offset => {
    const date = new Date(descriptor.startDate);
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  // Format time
  const timeStr = formatTimeString(hours, minutes);
  
  // Handle special case for GMT-specific times
  if (descriptor.dayOffset.length >= 2 && 
      (descriptor.dayOffset.includes(5) || descriptor.dayOffset.includes(6))) {
    // This is a simplification - in a real implementation, you'd analyze the pattern
    // more thoroughly to determine the exact GMT times
    return `Races on specific days at specific GMT times`;
  }
  
  if (dates.length === 1) {
    return `Special race on ${dates[0]} at ${timeStr}`;
  } else {
    return `Special races at ${timeStr} on: ${dates.join(', ')}`;
  }
}

/**
 * Creates a description for daily repeating races
 */
function createDailyScheduleDescription(hours: number, minutes: number, repeatMinutes: number): string {
  // Handle common intervals
  if (repeatMinutes === 15) {
    return `Races every 15 minutes`;
  } else if (repeatMinutes === 30) {
    if (minutes === 0) {
      return `Races every 30 minutes at :00 and :30 after`;
    } else if (minutes === 15) {
      return `Races every 30 minutes at :15 and :45`;
    } else {
      return `Races every 30 minutes starting at ${formatMinutesStr(minutes)} past the hour`;
    }
  } else if (repeatMinutes === 60) {
    if (minutes === 0) {
      return `Races every hour on the hour`;
    } else if (minutes === 45) {
      return `Races every hour at :45`;
    } else {
      return `Races every hour at :${formatMinutesStr(minutes)}`;
    }
  } else if (repeatMinutes === 120) {
    // Even/odd hour patterns - this is where timezone offset matters
    const isEvenHour = hours % 2 === 0;
    
    if (isEvenHour) {
      if (minutes === 0) {
        return `Races every even 2 hours on the hour`;
      } else if (minutes === 45) {
        return `Races every even 2 hours at :45`;
      } else {
        return `Races every even 2 hours at :${formatMinutesStr(minutes)} past`;
      }
    } else {
      if (minutes === 0) {
        return `Races every odd 2 hours on the hour`;
      } else if (minutes === 45) {
        return `Races every odd 2 hours at :45`;
      } else {
        return `Races every odd 2 hours at :${formatMinutesStr(minutes)} past`;
      }
    }
  } else {
    // Generic case
    return `Races every ${repeatMinutes} minutes`;
  }
}

/**
 * Creates a description for weekend race schedules
 */
function createWeekendScheduleDescription(
  descriptor: RaceTimeDescriptor,
  hours: number,
  minutes: number,
  repeatMinutes: number
): string {
  // This is a simplified implementation
  // In a real implementation, you'd analyze the pattern more thoroughly
  
  if (repeatMinutes === 0) {
    return `Races on weekends at ${formatTimeString(hours, minutes)}`;
  } else {
    return `Races on weekends every ${repeatMinutes} minutes starting at ${formatTimeString(hours, minutes)}`;
  }
}

/**
 * Creates a description for weekly race schedules
 */
function createWeeklyScheduleDescription(
  descriptor: RaceTimeDescriptor,
  hours: number,
  minutes: number,
  repeatMinutes: number
): string {
  // This is a simplified implementation
  // In a real implementation, you'd determine the day of week
  
  if (repeatMinutes === 0) {
    return `Races weekly at ${formatTimeString(hours, minutes)}`;
  } else if (repeatMinutes === 60) {
    return `Races weekly every hour starting at ${formatTimeString(hours, minutes)}`;
  } else if (repeatMinutes === 120) {
    return `Races weekly every 2 hours starting at ${formatTimeString(hours, minutes)}`;
  } else {
    return `Races weekly every ${repeatMinutes} minutes starting at ${formatTimeString(hours, minutes)}`;
  }
}

/**
 * Creates a description for schedules with multiple specific days
 */
function createMultipleDaysScheduleDescription(
  descriptor: RaceTimeDescriptor,
  hours: number,
  minutes: number,
  repeatMinutes: number,
  timezoneOffsetMinutes: number = 0
): string {
  // Calculate the days of the week for each offset
  const daysOfWeek = descriptor.dayOffset.map(offset => {
    // When applying timezone offset, we need to check if the day changes
    const date = new Date(descriptor.startDate);
    
    // First add the day offset
    date.setDate(date.getDate() + offset);
    
    // Then adjust for timezone if needed
    if (timezoneOffsetMinutes !== 0) {
      // Get the time from firstSessionTime
      const [sessionHours, sessionMinutes] = descriptor.firstSessionTime.split(':').map(Number);
      
      // Set the time on the date object
      date.setHours(sessionHours, sessionMinutes, 0, 0);
      
      // Apply timezone offset
      date.setMinutes(date.getMinutes() + timezoneOffsetMinutes);
    }
    
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  });
  
  // Format time
  const timeStr = formatTimeString(hours, minutes);
  
  if (repeatMinutes === 0) {
    return `Races at ${timeStr} on ${formatList(daysOfWeek)}`;
  } else if (repeatMinutes === 60) {
    return `Races every hour on ${formatList(daysOfWeek)} starting at ${timeStr}`;
  } else if (repeatMinutes === 120) {
    return `Races every 2 hours on ${formatList(daysOfWeek)} starting at ${timeStr}`;
  } else {
    return `Races every ${repeatMinutes} minutes on ${formatList(daysOfWeek)} starting at ${timeStr}`;
  }
}

/**
 * Creates a description of the time pattern
 */
function createTimePattern(hours: number, minutes: number, repeatMinutes: number): string {
  const timeStr = formatTimeString(hours, minutes);
  
  if (repeatMinutes === 0) {
    return `at ${timeStr}`;
  } else if (repeatMinutes === 60) {
    if (minutes === 0) {
      return `every hour on the hour`;
    } else if (minutes === 45) {
      return `every hour at :45`;
    } else {
      return `every hour at :${formatMinutesStr(minutes)} past`;
    }
  } else if (repeatMinutes === 120) {
    const isEvenHour = hours % 2 === 0;
    
    if (isEvenHour) {
      if (minutes === 45) {
        return `every even 2 hours at :45`;
      } else {
        return `every even 2 hours starting at ${timeStr}`;
      }
    } else {
      if (minutes === 45) {
        return `every odd 2 hours at :45`;
      } else {
        return `every odd 2 hours starting at ${timeStr}`;
      }
    }
  } else if (repeatMinutes === 30) {
    if (minutes === 0) {
      return `every 30 minutes at :00 and :30 past`;
    } else if (minutes === 15) {
      return `every 30 minutes at :15 and :45`;
    } else {
      return `every 30 minutes starting at ${timeStr}`;
    }
  } else {
    return `every ${repeatMinutes} minutes starting at ${timeStr}`;
  }
}

/**
 * Formats a time string in 12-hour format
 */
function formatTimeString(hours: number, minutes: number): string {
  // Ensure hours are in 0-23 range
  hours = ((hours % 24) + 24) % 24;
  
  const period = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${formatMinutesStr(minutes)}${period}`;
}

/**
 * Formats minutes with leading zero if needed
 */
function formatMinutesStr(minutes: number): string {
  // Ensure minutes are in 0-59 range
  minutes = ((minutes % 60) + 60) % 60;
  return minutes.toString().padStart(2, '0');
}

/**
 * Formats a list of items in a natural language way
 */
function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1).join(', ');
  return `${otherItems}, and ${lastItem}`;
}

/**
 * Formats a date with an offset
 */
function formatDate(startDate: string, offset: number): string {
  const date = new Date(startDate);
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Creates a human-readable description for all race time descriptors in a series
 * @param descriptors Array of race time descriptors
 * @param timezoneOffsetMinutes Optional timezone offset in minutes
 * @returns A string with all schedule descriptions
 */
export function createSeriesScheduleDescription(
  descriptors: RaceTimeDescriptor[], 
  timezoneOffsetMinutes: number = 0
): string {
  if (!descriptors || descriptors.length === 0) {
    return "No scheduled races";
  }
  
  // Handle single descriptor case
  if (descriptors.length === 1) {
    return createReadableSchedule(descriptors[0], timezoneOffsetMinutes);
  }
  
  // Handle multiple descriptors
  return descriptors.map((descriptor, index) => {
    return `Schedule ${index + 1}: ${createReadableSchedule(descriptor, timezoneOffsetMinutes)}`;
  }).join('\n');
}

/**
 * Determines if a race is currently active based on its start date
 * @param descriptor The race time descriptor
 * @returns Boolean indicating if the race is currently active
 */
export function isRaceActive(descriptor: RaceTimeDescriptor): boolean {
  const now = new Date();
  const startDate = new Date(descriptor.startDate);
  
  // Check if we're past the start date
  if (now < startDate) {
    return false;
  }
  
  // For non-repeating events, check if we're past all the scheduled dates
  if (!descriptor.repeating) {
    const lastRaceDate = new Date(descriptor.startDate);
    const lastOffset = Math.max(...descriptor.dayOffset);
    lastRaceDate.setDate(lastRaceDate.getDate() + lastOffset);
    
    // Add session duration to get the end time of the last race
    lastRaceDate.setMinutes(lastRaceDate.getMinutes() + descriptor.sessionMinutes);
    
    return now <= lastRaceDate;
  }
  
  // For repeating events, they're active after the start date
  return true;
}
