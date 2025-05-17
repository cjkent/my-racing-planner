# Race Schedule Time Descriptors

## Overview

The `race_time_descriptors` object in the iRacing API data represents the schedule for when races occur in a series. This document explains the structure and how to interpret it to create human-readable schedule descriptions.

## Structure

The `race_time_descriptors` is an array of objects, where each object describes a pattern of race start times. A typical object contains:

```json
{
  "dayOffset": [0, 1, 2, 3, 4, 5, 6],
  "firstSessionTime": "00:45:00",
  "repeatMinutes": 120,
  "repeating": true,
  "sessionMinutes": 72,
  "startDate": "2025-02-11",
  "superSession": false
}
```

### Key Properties

- **dayOffset**: Array of integers representing the offset in days from the `startDate`. For example, [0, 1, 2, 3, 4, 5, 6] means races occur every day for a week starting from the startDate.
- **firstSessionTime**: The time of day when the first race session starts (in "HH:MM:SS" format)
- **repeatMinutes**: The interval between race starts in minutes
- **repeating**: Boolean indicating whether races repeat throughout the day
- **sessionMinutes**: Duration of the race session in minutes
- **startDate**: The date when this schedule begins
- **superSession**: Boolean indicating if this is a special "super session" race

Some entries may have `repeating: false`, which typically indicates special event races that occur only at specific times rather than on a regular schedule.

## Interpreting the Schedule

To create a human-readable description of the race schedule:

1. Check if the race is `repeating`
2. If repeating:
   - Note the `firstSessionTime` (when races start)
   - Note the `repeatMinutes` (how often they occur)
   - Analyze `dayOffset` to understand which days from the start date have races
3. If not repeating:
   - Calculate the specific dates using `startDate` + each value in `dayOffset`

## Common Schedule Patterns

### Daily Patterns

When `dayOffset` is [0, 1, 2, 3, 4, 5, 6], races occur every day. The description should focus on the time pattern:

- **Every 15 minutes**: "Races every 15 minutes"
- **Every 30 minutes**: "Races every 30 minutes at :00 and :30 after" or "Races every 30 minutes at :15 and :45 after"
- **Every hour**: "Races every hour on the hour" (when minutes=0) or "Races every hour at :15" (when minutes=15)
- **Every 2 hours on even hours**: "Races every even 2 hours on the hour" or "Races every even 2 hours at :15 past"
- **Every 2 hours on odd hours**: "Races every odd 2 hours on the hour" or "Races every odd 2 hours at :45 past"

### Weekend Patterns

When `dayOffset` contains weekend days (typically 5 and 6 for Saturday and Sunday), the description should mention the specific days:

- "Races on Saturday at 1 & 13 GMT"
- "Races on Saturday at 7 & 17:00 GMT & Sunday at 0 & 13 GMT"
- "Races Saturdays 9 and 19 GMT and Sundays 17 GMT"

### Weekly Patterns

When `dayOffset` contains days that are multiples of 7 apart (e.g., [0, 7, 14, 21]), races occur on the same day each week:

- "Races weekly at 8:00pm"
- "Races weekly every hour starting at 2:00pm"

### Special Events (Non-repeating)

For non-repeating events (`repeating: false`), the description should list the specific dates:

- "Special race on Feb 11 at 7:00pm"
- "Special races at 7:00pm on: Feb 11, Feb 18, Feb 25"

## Timezone Handling

Race schedules are typically provided in UTC time. To display them in a user's local timezone:

1. Apply the timezone offset to the `firstSessionTime`
2. Consider how the offset affects the description:
   - A +1 hour offset can change an even hour to an odd hour (and vice versa)
   - Large offsets may change the day, affecting weekend or specific day patterns
   - Minute offsets may change time descriptions (e.g., "on the hour" to "at :30 past")

### Examples with Timezone Offsets

1. **UTC schedule: "Races every even 2 hours on the hour"**
   - With +1 hour offset: "Races every odd 2 hours on the hour"
   - With -1 hour offset: "Races every odd 2 hours on the hour"

2. **UTC schedule: "Races at 11:45pm on Saturday"**
   - With +2 hours offset: "Races at 1:45am on Sunday"
   - With -2 hours offset: "Races at 9:45pm on Saturday"

3. **UTC schedule: "Races every hour at :45 past"**
   - With +15 minutes offset: "Races every hour on the hour"
   - With -15 minutes offset: "Races every hour at :30 past"

## Examples of Human-Readable Descriptions

Here are examples of how different schedule patterns should be described:

1. **Daily races every hour on the hour**:
   ```json
   {
     "dayOffset": [0, 1, 2, 3, 4, 5, 6],
     "firstSessionTime": "00:00:00",
     "repeatMinutes": 60,
     "repeating": true
   }
   ```
   Human-readable: "Races every hour on the hour"

2. **Daily races every 2 hours at 15 past the hour, starting on an even hour**:
   ```json
   {
     "dayOffset": [0, 1, 2, 3, 4, 5, 6],
     "firstSessionTime": "02:15:00",
     "repeatMinutes": 120,
     "repeating": true
   }
   ```
   Human-readable: "Races every even 2 hours at :15 past"

3. **Weekend special events**:
   ```json
   {
     "dayOffset": [5, 6],
     "firstSessionTime": "19:00:00",
     "repeating": false
   }
   ```
   Human-readable: "Races on Saturday at 7:00pm and Sunday at 7:00pm"

## Implementation Approach

The implementation should:

1. Identify the pattern type (daily, weekend, weekly, special event)
2. Format the time appropriately (12-hour format with am/pm)
3. Generate natural-sounding descriptions based on the pattern
4. Handle special cases for common intervals (15min, 30min, 60min, 120min)
5. Use appropriate language for different minute values (e.g., "on the hour" vs. "at :15 past")
6. Apply timezone offsets correctly, considering how they affect the description

The TypeScript implementation in `src/utils/race-schedule.ts` follows this approach with functions to:
- Detect pattern types
- Create appropriate descriptions for each pattern
- Format times and dates consistently
- Handle multiple race time descriptors for a single series
- Apply timezone offsets to adjust the descriptions

## Advanced Considerations

For a complete implementation, consider:

1. Handling multiple race_time_descriptors for a single series
2. Accounting for different time zones
3. Checking if the schedule is currently active based on startDate and dayOffset
4. Special handling for superSession races
5. Considering sessionMinutes to indicate race duration
6. Detecting patterns in dayOffset (weekly, bi-weekly, etc.)
7. Generating descriptions that match the examples in race-schedule-descriptions.txt
8. Handling day changes due to timezone offsets

This information can be used to create a user-friendly display of race schedules in the My Racing Planner application.
