import React from 'react';
import {
  render,
  fireEvent,
  userEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import TestingScreen from '../screens/TestingScreen';
import Card from '../components/TestingScreen/Card';

jest.mock('react-native-orientation-locker', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    lockToPortrait: jest.fn(),
    lockToLandscapeLeft: jest.fn(),
    lockToLandscapeRight: jest.fn(),
    unlockAllOrientation: jest.fn(),
  };
});

describe('Testing screen rntl', () => {
  it('should render React Native image', () => {
    render(<TestingScreen />); // Queries
    const image = screen.getByTestId('image');
    expect(image).toBeTruthy();
  });

  it('should render React Native title', () => {
    render(<TestingScreen />); // Queries
    const title = screen.getByText('React Native');
    expect(title).toBeTruthy();
  });

  it('should render React Native paragraph', () => {
    render(<TestingScreen />); // Queries
    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toBeTruthy();
  });

  it('should render React Native button', () => {
    render(<TestingScreen />); // fireEvent
    fireEvent.press(screen.getByTestId('button'));
  });

  it('should handle text input using userEvent', async () => {
    render(<TestingScreen />); // userEvent
    const input = screen.getByTestId('textInput');

    const user = userEvent.setup();
    await user.type(input, 'Hello world!');

    const typedValue = await screen.findByDisplayValue('Hello world!');
    expect(typedValue).toBeTruthy();
  });

  it('should handle increments counter asynchronously', async () => {
    render(<TestingScreen />); // wait for
    expect(screen.getByText('Count: 0')).toBeTruthy();
    await waitFor(
      () => {
        expect(screen.getByText('Count: 2')).toBeTruthy();
      },
      {
        timeout: 2000,
        interval: 100,
      },
    );
  });

  it('should handle button press and log to console', () => {
    const mockLog = jest.spyOn(global.console, 'log'); // Mock the console.log function
    render(<TestingScreen />);
    fireEvent.press(screen.getByTestId('button'));
    expect(mockLog).toHaveBeenCalledWith('Button pressed');
    mockLog.mockRestore();
  });

  it('should render the title, description, and image correctly', () => {
    // composite component
    render(
      <Card
        title="Test Title"
        description="Test Description"
        imageUrl={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        }}
      />,
    );

    screen.debug();

    expect(screen.getByText('Test Title')).toBeTruthy();

    expect(screen.getByText('Test Description')).toBeTruthy();

    const image = screen.getByTestId('card-image');
    expect(image.props.source).toEqual({
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    });
  });

  it('should update when the prop changes', () => {
    // update
    render(
      <Card
        title="Test Title"
        description="Test Description"
        imageUrl={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        }}
      />,
    );

    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Test Description')).toBeTruthy();
    expect(screen.getByTestId('card-image').props.source).toEqual({
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    });

    screen.update(
      <Card
        title="Updated Title"
        description="Updated Description"
        imageUrl={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        }}
      />,
    );

    expect(screen.getByText('Updated Title')).toBeTruthy();
    expect(screen.getByText('Updated Description')).toBeTruthy();
    expect(screen.getByTestId('card-image').props.source).toEqual({
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    });
  });
});
