import { createTransform } from 'redux-persist';

const DateTransform = createTransform(
  // state to be persisted
  (inboundState, key) => inboundState,
  // state to be rehydrated
  (outboundState, key) => {
    return {
      ...outboundState,
      history: outboundState.history.map(item => {
        return {
          ...item,
          date: new Date(item.date),
        };
      }),
    };
  },
  { whitelist: ['search'] },
);

export default DateTransform;
