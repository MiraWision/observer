# @mirawision/observer

A lightweight and flexible observer pattern implementation for TypeScript, providing a simple way to implement event-driven architecture with type safety. This library offers a clean and intuitive API for implementing the observer pattern in your applications.

[Demo and advanced Documentation can be found here!](https://mirawision.github.io/observer)

## Features

- **Type Safety**: Full TypeScript support with generic types for type-safe event data
- **Simple API**: Clean and intuitive interface for subscribing, unsubscribing, and notifying observers
- **Memory Efficient**: Uses Set for efficient observer management and automatic cleanup
- **Flexible**: Generic implementation allows for any data type to be passed to observers
- **Lightweight**: Minimal footprint with no external dependencies
- **Unsubscribe Support**: Individual and bulk unsubscribe methods for proper cleanup

## Installation

```bash
npm install @mirawision/observer
```

or 

```bash
yarn add @mirawision/observer
```

## Usage

### Basic Example

```typescript
import { Observer } from '@mirawision/observer';

// Create an observer instance for string events
const observer = new Observer<string>();

// Subscribe to events
const listener1 = (data: string) => {
  console.log('Listener 1 received:', data);
};

const listener2 = (data: string) => {
  console.log('Listener 2 received:', data);
};

observer.subscribe(listener1);
observer.subscribe(listener2);

// Notify all observers
observer.notify('Hello, World!');
// Output:
// Listener 1 received: Hello, World!
// Listener 2 received: Hello, World!
```

### Working with Custom Types

```typescript
import { Observer } from '@mirawision/observer';

// Define a custom type for your events
interface UserEvent {
  id: number;
  name: string;
  action: 'login' | 'logout';
}

// Create an observer for your custom type
const userObserver = new Observer<UserEvent>();

// Subscribe with type-safe listeners
userObserver.subscribe((event: UserEvent) => {
  console.log(`User ${event.name} (ID: ${event.id}) performed ${event.action}`);
});

// Notify with type-safe data
userObserver.notify({
  id: 123,
  name: 'John Doe',
  action: 'login'
});
// Output: User John Doe (ID: 123) performed login
```

### Managing Subscriptions

```typescript
import { Observer } from '@mirawision/observer';

const observer = new Observer<number>();

const listener = (data: number) => {
  console.log('Received:', data);
};

// Subscribe
observer.subscribe(listener);

// Notify
observer.notify(42);
// Output: Received: 42

// Unsubscribe specific listener
observer.unsubscribe(listener);

// Notify again (no output since listener was removed)
observer.notify(100);

// Unsubscribe all listeners
observer.unsubscribeAll();
```

### Real-world Example: Event System

```typescript
import { Observer } from '@mirawision/observer';

// Define event types
interface AppEvent {
  type: 'user-login' | 'user-logout' | 'data-update';
  payload: any;
  timestamp: Date;
}

// Create a global event bus
class EventBus {
  private observer = new Observer<AppEvent>();

  subscribe(listener: (event: AppEvent) => void) {
    this.observer.subscribe(listener);
  }

  unsubscribe(listener: (event: AppEvent) => void) {
    this.observer.unsubscribe(listener);
  }

  emit(event: AppEvent) {
    this.observer.notify(event);
  }
}

// Usage
const eventBus = new EventBus();

// Subscribe to events
eventBus.subscribe((event) => {
  console.log(`[${event.timestamp.toISOString()}] ${event.type}:`, event.payload);
});

// Emit events
eventBus.emit({
  type: 'user-login',
  payload: { userId: 123, username: 'john' },
  timestamp: new Date()
});

eventBus.emit({
  type: 'data-update',
  payload: { items: ['item1', 'item2'] },
  timestamp: new Date()
});
```

### React Integration Example

```typescript
import React, { useEffect, useState } from 'react';
import { Observer } from '@mirawision/observer';

// Create a global observer for app state
const appStateObserver = new Observer<{ theme: 'light' | 'dark' }>();

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleThemeChange = (data: { theme: 'light' | 'dark' }) => {
      setTheme(data.theme);
    };

    appStateObserver.subscribe(handleThemeChange);

    // Cleanup on unmount
    return () => {
      appStateObserver.unsubscribe(handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    appStateObserver.notify({ theme: newTheme });
  };

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## API Reference

### Observer<T>

A generic observer class that manages a collection of listeners for a specific data type.

#### Methods

- `subscribe(observer: ObserverListener<T>): void`
  - Adds a listener to the observer
  - The listener will be called whenever `notify()` is called

- `unsubscribe(observer: ObserverListener<T>): void`
  - Removes a specific listener from the observer
  - Useful for cleanup to prevent memory leaks

- `unsubscribeAll(): void`
  - Removes all listeners from the observer
  - Clears the entire observer collection

- `notify(data: T): void`
  - Notifies all subscribed listeners with the provided data
  - Calls each listener function with the data parameter

#### Type Definitions

```typescript
type ObserverListener<T> = (data: T) => void;

class Observer<T> {
  // ... methods
}
```

## Project Structure

```
observer/
├── src/                    # Source code
│   └── index.ts           # Main Observer implementation
├── tests/                 # Test files
│   └── observer.test.ts   # Test suite
├── docs/                  # Documentation site
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest testing configuration
└── README.md             # This file
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Build the library
npm run build
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. 