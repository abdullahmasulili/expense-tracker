# Expense Tracker App

This is a React Native expense tracker app that allows users to manage their expenses and provides different components for regular users and admins.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Software Architecture](#software-architecture)
- [Design Patterns](#design-patterns)

---

## Getting Started

Follow the instructions below to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (>= 14.x.x)
- [JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (v17)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) or [Expo CLI](https://docs.expo.dev/)
- [Android Studio](https://developer.android.com/studio) and/or [Xcode](https://developer.apple.com/xcode/) (for iOS development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/abdullahmasulili/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

If you're using npm:

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

### Running the Project

To run the app on an Android emulator or a real device:

```bash
npm run android
```

To run the app on an iOS emulator or a real device (only on macOS):

```bash
npm run ios
```

## Software Architecture

This app follows a Component-Based Architecture to ensure reusability, scalability, and ease of maintenance. The application is divided into small, reusable components, with a clear separation of concerns between UI (view) components and logic components.

- **Screens**: Each major view (e.g., Home, Expenses, Admin) is broken into separate screen components
- **Layouts**: Common UI layouts like headers, footers, and navigation elements are kept in reusable layout components
- **Inputs** and Forms: Reusable form components for adding or editing expenses.

The app uses **Stack Navigator** for handling the navigation between different screens and **Bottom Tab Navigator** for organizing the layout into tabs.

## Design Patterns

### Component-Based Architecture

The app breaks down the UI into reusable and independent components such as screens, layouts, and input fields. This approach enables easy management of the app's complexity, making the codebase modular and maintainable.

### Container-Presenter Pattern (Smart-Dumb Components)

This pattern helps separate the concerns of managing data and state from rendering the UI. The "smart" components (containers) handle the state and logic, while "dumb" components (presenters) are stateless and focused purely on displaying data.

For Example:

- **Smart Components**: Manage business logic, handle state, and pass data to child components.
- **Dumb Components**: Stateless and responsible for presenting the UI, receiving props from parent components.

---

## Additional Notes

- This app is not optimized for iOS and also not tested
- Make sure to have an Android or iOS emulator set up, or connect a real device to your machine.
- The app uses mock data for development purposes. No live backend connection is required.
- Please make sure to run both **npm install** and **yarn install** to install the package since some package are only installed using one of it

# Troubleshooting

- If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
- If you encountered issue on related to unable to move immutable diretory, please refer this [Github Thread](https://github.com/facebook/react-native/issues/46210#issuecomment-2315210922)
