export default function reducer(state = { text: '' }, action) {
  if (action.type === 'HELLO') {
    return {
      text: 'hello, react!',
    };
  }
  return state;
}

