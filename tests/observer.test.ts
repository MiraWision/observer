import { Observer } from '../src/index';

describe('Observer', () => {
  let observer: Observer<string>;

  beforeEach(() => {
    observer = new Observer<string>();
  });

  test('should subscribe and notify observers', () => {
    const mockListener = jest.fn();
    observer.subscribe(mockListener);
    
    observer.notify('test data');
    
    expect(mockListener).toHaveBeenCalledWith('test data');
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test('should notify multiple observers', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    observer.subscribe(mockListener1);
    observer.subscribe(mockListener2);
    
    observer.notify('test data');
    
    expect(mockListener1).toHaveBeenCalledWith('test data');
    expect(mockListener2).toHaveBeenCalledWith('test data');
  });

  test('should unsubscribe specific observer', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    observer.subscribe(mockListener1);
    observer.subscribe(mockListener2);
    
    observer.unsubscribe(mockListener1);
    observer.notify('test data');
    
    expect(mockListener1).not.toHaveBeenCalled();
    expect(mockListener2).toHaveBeenCalledWith('test data');
  });

  test('should unsubscribe all observers', () => {
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();
    
    observer.subscribe(mockListener1);
    observer.subscribe(mockListener2);
    
    observer.unsubscribeAll();
    observer.notify('test data');
    
    expect(mockListener1).not.toHaveBeenCalled();
    expect(mockListener2).not.toHaveBeenCalled();
  });

  test('should work with custom types', () => {
    interface TestEvent {
      id: number;
      message: string;
    }
    
    const customObserver = new Observer<TestEvent>();
    const mockListener = jest.fn();
    
    customObserver.subscribe(mockListener);
    
    const testEvent: TestEvent = { id: 1, message: 'test' };
    customObserver.notify(testEvent);
    
    expect(mockListener).toHaveBeenCalledWith(testEvent);
  });

  test('should handle empty observer list', () => {
    expect(() => {
      observer.notify('test data');
    }).not.toThrow();
  });

  test('should handle duplicate subscriptions', () => {
    const mockListener = jest.fn();
    
    observer.subscribe(mockListener);
    observer.subscribe(mockListener); // Duplicate subscription
    
    observer.notify('test data');
    
    expect(mockListener).toHaveBeenCalledTimes(1); // Should only be called once due to Set
  });
}); 