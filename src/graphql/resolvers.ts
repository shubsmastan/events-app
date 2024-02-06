import { Event } from "@/types/Events";

const events: Event[] = [];

export const resolvers = {
  events: () => {
    return events;
  },

  createEvent: ({
    eventInput,
  }: {
    eventInput: { name: string; desc: string; price: number };
  }) => {
    console.log(eventInput);
    const event = {
      _id: (Math.random() * Math.pow(10, 17)).toString(),
      name: eventInput.name,
      desc: eventInput.desc,
      price: eventInput.price,
      date: new Date().toISOString(),
    };
    events.push(event);
    return event;
  },
};
