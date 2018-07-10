const mock = {
  get: jest.fn(() => Promise.resolve({
    data: {
      answer: 'mock_yes',
      image: 'mock.png'
    }
  }))
};
export default mock