# React Webview BottomSheet

A lightweight, customizable, draggable bottom sheet component for React applications, optimized for webviews in mobile applications.

## Features

- 📱 Optimized for mobile and webview experiences
- 🔄 Smooth drag gestures with touch support
- ⚡ Snap points functionality
- 🎨 Highly customizable appearance and behavior
- 🌈 Responsive design with percentage and pixel-based sizing
- 📝 Written in TypeScript with complete type definitions
- 🧩 Context API for easy sheet management across components
- ♿ Fully accessible with ARIA attributes and keyboard support
- 🔧 Zero dependencies (other than React)
- 🚀 Enhanced dragging with `DraggableBottomSheet` component

## Installation

```bash
npm install react-webview-bottomsheet
# or
yarn add react-webview-bottomsheet
```

## Usage

### Basic BottomSheet

```jsx
import React, { useState } from "react";
import { BottomSheet } from "react-webview-bottomsheet";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Bottom Sheet</button>

      <BottomSheet
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
        initialHeight="30%"
        maxHeight="90%"
        enableSnapping={true}
        snapPoints={[20, 50, 90]}
      >
        <div>
          <h2 id="sheet-title">Bottom Sheet Content</h2>
          <p>This is the content of your bottom sheet</p>
        </div>
      </BottomSheet>
    </div>
  );
};

export default App;
```

### Enhanced DraggableBottomSheet (New!)

The `DraggableBottomSheet` component extends the basic BottomSheet with improved drag functionality:

```jsx
import React, { useState } from "react";
import { DraggableBottomSheet } from "react-webview-bottomsheet";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(50);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Bottom Sheet</button>
      <p>Current height: {currentHeight.toFixed(1)}%</p>

      <DraggableBottomSheet
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
        initialHeight="50%" // Start at 50% height
        snapPoints={[30, 50, 80]}
        // Enhanced drag functionality
        showDragArea={true}
        dragAreaText="Drag to resize"
        onHeightPercentChange={(height) => setCurrentHeight(height)}
      >
        <div>
          <h2>Draggable Bottom Sheet</h2>
          <p>This bottom sheet has enhanced drag functionality</p>
        </div>
      </DraggableBottomSheet>
    </div>
  );
};
```

## DraggableBottomSheet Props

The `DraggableBottomSheet` component extends all props from `BottomSheet` and adds:

| Prop                    | Type                     | Default           | Description                                          |
| ----------------------- | ------------------------ | ----------------- | ---------------------------------------------------- |
| `showDragArea`          | boolean                  | true              | Whether to show the extra drag area inside the sheet |
| `dragAreaStyle`         | CSSProperties            | {}                | Custom styles for the internal drag area             |
| `dragAreaClassName`     | string                   | ""                | Class name for the internal drag area                |
| `dragAreaText`          | string                   | "드래그하여 이동" | Text to display in the drag area                     |
| `onHeightPercentChange` | (height: number) => void | undefined         | Callback with current height as percentage           |

## BottomSheet Props

| Prop                  | Type                        | Default              | Description                                                  |
| --------------------- | --------------------------- | -------------------- | ------------------------------------------------------------ |
| `children`            | ReactNode                   | (required)           | Content to render inside the bottom sheet                    |
| `initialHeight`       | string                      | '30%'                | Initial height of the bottom sheet (when not expanded)       |
| `maxHeight`           | string                      | '90%'                | Maximum height the bottom sheet can expand to                |
| `minHeight`           | string                      | '10%'                | Minimum height the bottom sheet can shrink to                |
| `isVisible`           | boolean                     | true                 | Whether the bottom sheet is initially visible                |
| `enableSnapping`      | boolean                     | true                 | Whether the bottom sheet should snap to predefined points    |
| `isDraggable`         | boolean                     | true                 | Whether the bottom sheet should be draggable                 |
| `snapPoints`          | number[]                    | [30, 60, 90]         | Snap points as percentage of viewport height                 |
| `containerStyle`      | CSSProperties               | {}                   | Custom styles for the bottom sheet container                 |
| `contentStyle`        | CSSProperties               | {}                   | Custom styles for the bottom sheet content                   |
| `handleStyle`         | CSSProperties               | {}                   | Custom styles for the handle/drag indicator                  |
| `backdropColor`       | string                      | 'rgba(0, 0, 0, 0.5)' | Background color of the overlay                              |
| `showBackdrop`        | boolean                     | true                 | Whether to show the backdrop                                 |
| `closeOnClickOutside` | boolean                     | true                 | Whether to hide the bottom sheet when clicking outside       |
| `closeOnEscape`       | boolean                     | true                 | Whether to close the bottom sheet when pressing Escape       |
| `onClose`             | () => void                  | undefined            | Callback when the bottom sheet is closed                     |
| `onHeightChange`      | (height: number) => void    | undefined            | Callback when the bottom sheet height changes                |
| `onSnap`              | (snapIndex: number) => void | undefined            | Callback when the bottom sheet reaches a snap point          |
| `onDragStart`         | () => void                  | undefined            | Callback when the bottom sheet starts being dragged          |
| `onDragEnd`           | () => void                  | undefined            | Callback when the bottom sheet stops being dragged           |
| `showHandle`          | boolean                     | true                 | Whether to show the drag handle indicator                    |
| `roundedCorners`      | boolean                     | true                 | Whether to round the top corners of the bottom sheet         |
| `cornerRadius`        | string                      | '12px'               | Radius for the top rounded corners (if enabled)              |
| `animated`            | boolean                     | true                 | Whether the sheet should animate when appearing/disappearing |
| `animationDuration`   | number                      | 300                  | Animation duration in milliseconds                           |
| `id`                  | string                      | undefined            | ID for the bottom sheet component (for accessibility)        |
| `className`           | string                      | undefined            | Class name for the bottom sheet container                    |
| `contentClassName`    | string                      | undefined            | Class name for the content container                         |
| `handleClassName`     | string                      | undefined            | Class name for the handle                                    |

## Using the Context Provider

The library includes a context provider for managing bottom sheets across your application:

```jsx
import React from "react";
import { BottomSheetProvider, useBottomSheet } from "react-webview-bottomsheet";

// Wrap your application with the provider
const App = () => {
  return (
    <BottomSheetProvider
      defaultProps={{ roundedCorners: true, cornerRadius: "16px" }}
    >
      <YourApp />
    </BottomSheetProvider>
  );
};

// Use the hook in any component
const YourComponent = () => {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const handleOpenSheet = () => {
    showBottomSheet({
      children: <YourContent />,
      initialHeight: "40%",
      onClose: () => hideBottomSheet(),
    });
  };

  return <button onClick={handleOpenSheet}>Open Sheet</button>;
};
```

## Browser Support

The component is designed to work on all modern browsers that support touch events, including:

- Chrome (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Edge

## Optimizations for Mobile WebViews

This component is specifically optimized for use in mobile webviews:

- Smooth touch interactions with proper touch event handling
- Performance optimizations to reduce jank during dragging
- Proper handling of viewport heights for mobile screens
- Appropriate defaults for mobile UX patterns
- WebkitOverflowScrolling for smooth scrolling on iOS

## Server-Side Rendering (SSR) Support

The component is fully compatible with server-side rendering frameworks like Next.js:

- Safely handles window and document references
- Proper hydration during client-side initialization
- Deferred calculations that depend on browser APIs

## Accessibility

The component is built with accessibility in mind:

- Proper ARIA roles and attributes
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Escape key support for closing

## Development

```bash
# Install dependencies
npm install

# Run storybook for development
npm run storybook

# Run tests
npm test

# Build the package
npm run build
```

## License

MIT © [신윤수](https://github.com/sysys10)
