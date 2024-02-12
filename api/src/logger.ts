import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.printf((info) => {
    let message = `${new Date(
      Date.now()
    ).toUTCString()} | ${info.level.toUpperCase()} | ${info.message}`;
    message += info.obj ? `data:${JSON.stringify(info.obj)} | ` : '';
    return message;
  }),
  transports: [new transports.Console({ level: 'debug' })],
});
