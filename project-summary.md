# My Racing Planner - Technical Implementation Summary

## Project Overview

My Racing Planner is a React-based web application designed to help iRacing users efficiently navigate series, cars, and tracks. It allows users to make informed decisions about content purchases based on usage in the current racing season. The application includes wishlist functionality, enabling users to add items and navigate to iRacing's website for purchasing.

## Architecture

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Chakra UI v3
- **State Management**: Zustand with persistence middleware
- **Routing**: Wouter (lightweight alternative to React Router)
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages

### Directory Structure

The project follows a component-based architecture with the following main directories:

- `/iracing-api`: Scripts for fetching and parsing data from iRacing's API
- `/src/components`: React components organized by feature
- `/src/ir-data`: Parsed JSON data files containing iRacing content information
- `/src/store`: Zustand stores for state management
- `/src/hooks`: Custom React hooks
- `/src/utils`: Utility functions

## Data Flow

### Data Fetching and Processing

1. **API Integration**: The application uses a custom implementation to interact with iRacing's public API, handling authentication and data retrieval.

2. **Data Fetching Process**:
   - Scripts in the `iracing-api` directory authenticate with iRacing using credentials from a `.env` file
   - Raw data is fetched for cars, tracks, series, assets, and other metadata
   - Data is stored in JSON files in the `iracing-api/raw` directory

3. **Data Parsing Process**:
   - Raw data is processed into more efficient structures
   - Relationships between cars, tracks, and series are established
   - Parsed data is stored in JSON files in the `iracing-api/parsed` directory
   - These files are then copied to `src/ir-data` for use in the application

### State Management

The application uses Zustand for state management with three main stores:

1. **IR Store** (`ir.ts`):
   - Manages user-specific data including owned cars/tracks, wishlist items, and favorite series
   - Uses Zustand's persist middleware to save data to localStorage

2. **UI Store** (`ui.ts`):
   - Manages UI state like selected filters, active tabs, and display preferences

3. **Notifications Store** (`notifications.ts`):
   - Handles application notifications and alerts

## Key Features Implementation

### Content Management

1. **Content Tracking**:
   - Users can mark cars and tracks as owned
   - The application stores this information locally
   - Content can be filtered based on ownership status

2. **Wishlist System**:
   - Users can add cars and tracks to a wishlist
   - The application calculates total cost and potential discounts
   - A checkout button links to iRacing's website for purchasing

3. **Content Transfer**:
   - The application supports sharing content selections via URL parameters
   - The `useContentTransfer` hook handles importing content data from URL

### Season Planning

1. **Series Management**:
   - Users can mark series as favorites
   - The application displays detailed information about each series including schedule, required content, and license requirements

2. **Schedule Visualization**:
   - The season page displays a calendar view of race weeks for favorite series
   - Users can see which tracks are used each week across multiple series

3. **Content Analysis**:
   - The application helps users identify which tracks are used most frequently
   - This helps prioritize purchases based on usage across favorite series

### UI Components

1. **Responsive Layout**:
   - The application uses a responsive design with different layouts for mobile and desktop
   - The `AppLayoutContext` provides layout information to components

2. **Navigation**:
   - Desktop: Side navigation bar with expanded labels
   - Mobile: Bottom navigation bar with icons

3. **Tables and Lists**:
   - Custom table components with sorting, filtering, and responsive behavior
   - Infinity tables for handling large datasets with efficient rendering

## Data Models

### Cars and Tracks

Both cars and tracks share similar data structures:
- Unique ID
- Name
- Price
- Free status (included with subscription)
- SKU (for purchasing)
- Categories
- Series where the content is used
- Logo/image assets

Additional track-specific properties:
- Configuration name (for tracks with multiple layouts)
- Track categories

### Series

Series data includes:
- Unique ID
- Name
- Category
- License requirements
- Race format (duration, laps)
- Setup type (fixed or open)
- Official status
- Multiclass information
- Weekly schedule with track information
- Cars used in the series

### Content Relationships

The application maintains relationships between different content types:
- Which cars are used in which series
- Which tracks are used in which series
- Which series use specific cars or tracks
- Grouping of content by SKU (for purchasing)

## Advanced Features

1. **Content Grouping**:
   - The application intelligently groups content that shares the same SKU
   - This prevents users from adding duplicate items to their wishlist

2. **Usage Analysis**:
   - Tracks are ranked by usage frequency across favorite series
   - This helps users make cost-effective purchasing decisions

3. **Export/Import**:
   - Users can share their content selections via URL parameters
   - This facilitates team coordination and recommendation sharing

## Build and Deployment

1. **Development**:
   - Local development server with hot module replacement
   - TypeScript for type safety

2. **Production Build**:
   - Optimized bundle using Vite's production build
   - Assets are deployed to GitHub Pages

3. **Data Updates**:
   - The application requires periodic updates to fetch new season data
   - Scripts automate the process of fetching and parsing data

## Conclusion

My Racing Planner is a sophisticated web application that leverages modern web technologies to provide iRacing users with a powerful tool for planning their racing seasons and content purchases. The application's architecture emphasizes performance, usability, and data integrity, while its feature set addresses the specific needs of the iRacing community.

The combination of React, TypeScript, Chakra UI, and Zustand creates a robust foundation for the application, while the custom data fetching and processing scripts ensure that users have access to accurate and up-to-date information about iRacing content and schedules.
