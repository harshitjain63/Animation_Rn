import React from 'react';
import {
  render,
  fireEvent,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import TestingScreen from '../screens/TestingScreen';
import {describe, expect, it, jest} from '@jest/globals';
import Card from '../components/TestingScreen/Card';

describe('Testing screen rntl', () => {
  it('should render React Native image', () => {
    const {getByTestId} = render(<TestingScreen />); // Queries
    const image = getByTestId('image');
    expect(image).toBeTruthy();
  });

  it('should render React Native title', () => {
    const {getByText} = render(<TestingScreen />); // Queries
    const title = getByText('React Native');
    expect(title).toBeTruthy();
  });

  it('should render React Native paragraph', () => {
    const {getByTestId} = render(<TestingScreen />); // Queries
    const paragraph = getByTestId('paragraph');
    expect(paragraph).toBeTruthy();
  });

  it('should render React Native button', () => {
    const {getByTestId} = render(<TestingScreen />); // fireEvent
    fireEvent.press(getByTestId('button'));
  });

  it('should handle text input using userEvent', async () => {
    const {getByTestId, findByDisplayValue} = render(<TestingScreen />); // userEvent
    const input = getByTestId('textInput');

    const user = userEvent.setup();
    await user.type(input, 'Hello world!');

    const typedValue = await findByDisplayValue('Hello world!');
    expect(typedValue).toBeTruthy();
  });

  it('should handle increments counter asynchronously', async () => {
    const {getByText} = render(<TestingScreen />); // wait for
    expect(getByText('Count: 0')).toBeTruthy();
    await waitFor(
      () => {
        expect(getByText('Count: 2')).toBeTruthy();
      },
      {
        timeout: 2000,
        interval: 100,
      },
    );
  });

  it('should handle button press and log to console', () => {
    const mockLog = jest.spyOn(global.console, 'log'); // Mock the console.log function
    const {getByTestId} = render(<TestingScreen />);
    fireEvent.press(getByTestId('button'));
    expect(mockLog).toHaveBeenCalledWith('Button pressed');
    mockLog.mockRestore();
  });

  it('should render the title, description, and image correctly', () => {
    // composite component
    const {getByText, getByTestId, debug} = render(
      <Card
        title="Test Title"
        description="Test Description"
        imageUrl={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        }}
      />,
    );

    debug();

    expect(getByText('Test Title')).toBeTruthy();

    expect(getByText('Test Description')).toBeTruthy();

    const image = getByTestId('card-image');
    expect(image.props.source).toEqual({
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    });
  });

  it('should update when the prop changes', () => {
    // update
    const {getByText, update, getByTestId} = render(
      <Card
        title="Test Title"
        description="Test Description"
        imageUrl={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        }}
      />,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByTestId('card-image').props.source).toEqual({
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    });

    update(
      <Card
        title="Updated Title"
        description="Updated Description"
        imageUrl={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        }}
      />,
    );

    expect(getByText('Updated Title')).toBeTruthy();
    expect(getByText('Updated Description')).toBeTruthy();
    expect(getByTestId('card-image').props.source).toEqual({
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    });
  });
});
